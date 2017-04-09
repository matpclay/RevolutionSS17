
import java.io.File;
import java.io.FileNotFoundException;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Scanner;


public class Main {
	static Map<String, String> lookup;
	static Map<String, String> reverseLookup;
	public static void main(String[] args) throws FileNotFoundException {
		readSymbols("tickers.txt");

		//System.out.println("YUM.N");
		//System.out.println("Ticker TSN.N is " + lookup.get("TSN"));
		//System.out.println(getClosestMatch("Alphabet"));
		searchArticle(getEntireFile("article.txt"));

	}

	public static String getEntireFile(String filename) throws FileNotFoundException {
		Scanner sc = new Scanner(new File(filename));
		String returnString = "";
		while (sc.hasNext()) returnString+=(sc.next() + " ") ;
		returnString = returnString.replace("(", "");
		returnString = returnString.replace(")", "");
		returnString = returnString.replace("-", "");
		returnString = returnString.replace("\"", "");
		return returnString;
	}

	public static void searchArticle(String text) {

		HashSet<String> allMatches = new HashSet<String>();
		String[] words = text.split(" ");
		for (int i = 0; i<words.length; i++) {
			HashSet<String> currentMatch = new HashSet<String>();
			currentMatch = findTicker(words[i]);
			if (currentMatch.isEmpty()) continue;
			//else i+=3;
			for (String match: currentMatch) {
				allMatches.add(match);
			}
		}
		System.out.println(allMatches);
	}
	public static void readSymbols(String filename) throws FileNotFoundException {
		Scanner sc = new Scanner(new File(filename));
		lookup = new HashMap<String, String>();
		reverseLookup = new HashMap<String, String>();
		while (sc.hasNext()) {
			String[] line = sc.nextLine().split(",");
			lookup.put(line[0].trim(), line[1].trim());
			reverseLookup.put(line[1].trim(), line[0].trim());
		}
	}

	public static HashSet<String> findTicker(String wordFromText) {
		
		HashSet<String> matches = new HashSet<String>();
		if(wordFromText.contains(".")) wordFromText=wordFromText.split("\\.")[0];
		//System.out.println(wordFromText);
		if (wordFromText.toUpperCase().equals(wordFromText)) {
			for (String s: lookup.keySet()) {
				if (wordFromText.equals(s))
					matches.add(s);

			}
		}
		return matches;
	}


	private static int minimum(int a, int b, int c) {
		return Math.min(Math.min(a, b), c);
	}

	public static int computeDistance(
			CharSequence str1,
			CharSequence str2 )
	{
		int[][] distance = new int[str1.length() + 1][str2.length() + 1];

		for (int i = 0; i <= str1.length(); i++)
			distance[i][0] = i;
		for (int j = 1; j <= str2.length(); j++)
			distance[0][j] = j;

		for (int i = 1; i <= str1.length(); i++)
			for (int j = 1; j <= str2.length(); j++)
				distance[i][j] =
				minimum(
						distance[i - 1][j] + 1,
						distance[i][j - 1] + 1,
						distance[i - 1][j - 1] +
						((str1.charAt(i - 1) == str2.charAt(j - 1)) ? 0 : 1));

		return distance[str1.length()][str2.length()];
	}

}
