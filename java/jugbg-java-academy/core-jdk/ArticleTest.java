/*
  Build and run:
    javac -d ./bin/ ./core-jdk/ArticleTest.java && java -cp ./bin/ ArticleTest
*/

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.GenericSignatureFormatError;
import java.net.MalformedURLException;
import java.net.URL;

public class ArticleTest {
  public static void main(String[] args) {
    System.out.println(
        getArticle("A"));
  }

  public static String getArticle(String title) {
    var url = String.format("https://en.wikipedia.org/api/rest_v1/page/html/%s", title);
    try (
        var iss = new java.net.URL(url).openConnection().getInputStream();
        var bos = new java.io.ByteArrayOutputStream()) {

      byte[] buf = new byte[4 * 1024];
      int bytesRead;
      while ((bytesRead = iss.read(buf)) != -1) {
        bos.write(buf, 0, bytesRead);
      }
      return bos.toString();
    } catch (Exception e) {
      return "";
    }
  }
}
