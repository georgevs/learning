package test;
public class Image implements java.io.Serializable {
  private int width;
  private int height;
  private byte[] content;

  private static final int PIXEL_SIZE = 1;  // assume 1 byte per pixel
  private static final int STRIDE_ALIGN = 4; // assume 4 bytes stride alignment

  public void setWidth(int width) { this.width = width; }
  public int getWidth() { return this.width; }

  public void setHeight(int height) { this.height = height; }
  public int getHeight() { return this.height; }

  public void setContent(byte[] content) { this.content = content; }
  public byte[] getContent() { return this.content; }

  Image() {
    this(0, 0, null);
  }

  Image(int width, int height, byte[] content) {
    this.width = width;
    this.height = height;
    this.content = content;
  }
  
  public void scale(int factor) {
    if (factor < 0) { 
      throw new IllegalArgumentException(String.format("Bad argument factor=%d", factor));
    }

    this.width *= factor;
    this.height *= factor;

    if (this.width * this.height == 0) {
      this.content = null;
    } else {

      int strideWidth = (this.width * PIXEL_SIZE + STRIDE_ALIGN) / STRIDE_ALIGN * STRIDE_ALIGN;
      var content = new byte[strideWidth * this.height];
      
      // TODO: magic for scaling the pixels from this.content to content...
      
      this.content = content;
    }
  }

  public static class Builder {
    private int width;
    private int height;
    private byte[] content;

    public Builder width(int width) { this.width = width; return this; }
    public Builder height(int height) { this.height = height; return this; }
    public Builder content(byte[] content) { this.content = content; return this; }
    public Image build() { return new Image(this.width, this.height, this.content); }
  }
}
