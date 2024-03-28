package bg.jug.academy;

import java.util.Arrays;

class Quiz {
  public static void main(String[] args) {
    // isEven(2);
    // isEven(3);

    // isPower(7);
    // isPower(8);

    isAnagram("abcd", "abcd");
    isAnagram("abcd", "abdc");
    isAnagram("abcd", "abdt");
    isAnagram("abcd", "abcdt");

    // isPalindrome(" a ba");
    // isPalindrome(" a bba");
    // isPalindrome(" a bba");
    // isPalindrome("abcdba");

    // binary(2);
    // binary(3);
    // binary(5);
  }

  public static void isEven(int number) {
    System.out.println(number % 2 == 0 ? "true" : "false");
  }

  public static void isPower(int number) {
    int i = 1;
    for(; i < number; i *= 2) { }
    System.out.println(i == number ? "true" : "false");
  }

  public static void isAnagram(String first, String second) {
  	char[] xs = first.toCharArray(); Arrays.sort(xs);
  	char[] ys = second.toCharArray(); Arrays.sort(ys);
    // System.out.println(java.util.Arrays.equals(xs, ys) ? "true" : "false");
    System.out.println(new String(xs).equals(new String(ys)) ? "true" : "false");
  }

  public static void isPalindrome(String test) {
    test = test.replace(" ", "");
    int i = 0, j = test.length() - 1;
    for (; i < j && test.charAt(i) == test.charAt(j); ++i, --j) { }
    System.out.println(i < j ? "false" : "true");
  }

  public static void binary(int n) {
    if (n < 0) { throw new RuntimeException("Unsupported"); }
    char[] digits = new char[32];
    int i = 1, j = digits.length;
    for (; i <= n; i *= 2) {
      digits[--j] = (i & n) != 0 ? '1' : '0';
    }
    // System.out.println(Integer.toBinaryString(n));
    System.out.println(new String(Arrays.copyOfRange(digits, j, digits.length)));
  }
}
