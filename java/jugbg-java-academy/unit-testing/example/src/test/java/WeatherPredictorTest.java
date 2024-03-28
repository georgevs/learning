public class WeatherPredictorTest {
  @org.junit.jupiter.api.Test
  public void shouldPredictIfServiceIsOperational() {
    var serviceMock = org.mockito.Mockito.mock(WeatherService.class);
    org.mockito.Mockito.when(serviceMock.predict(42)).thenReturn(42);

    WeatherPredictor predictor = new WeatherPredictor();
    predictor.setWeatherService(serviceMock);

    org.junit.jupiter.api.Assertions.assertEquals(42, predictor.predict(42));
  }
}


class WeatherService {
  public Integer predict(Integer weather) {
    throw new RuntimeException("Service is down.");
  }
}

class WeatherPredictor {
  private WeatherService weatherService = new WeatherService();
  public Integer predict(Integer degrees) {
    Integer result = weatherService.predict(degrees);
    return result;
  }
  public void setWeatherService(WeatherService weatherService) {
    this.weatherService = weatherService;
  }
}