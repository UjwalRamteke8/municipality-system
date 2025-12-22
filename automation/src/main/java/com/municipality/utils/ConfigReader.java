package com.municipality.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * ConfigReader - Reads configuration from properties file
 * Stores URLs, credentials, browser type, timeouts, etc.
 */
public class ConfigReader {

  private Properties properties;
  private static final String CONFIG_FILE = "src/test/resources/config.properties";

  /**
   * Constructor - Load config file
   */
  public ConfigReader() {
    try {
      FileInputStream fis = new FileInputStream(CONFIG_FILE);
      properties = new Properties();
      properties.load(fis);
      fis.close();
    } catch (IOException e) {
      System.out.println("Config file not found: " + CONFIG_FILE);
      e.printStackTrace();
    }
  }

  /**
   * Get application URL
   */
  public String getApplicationUrl() {
    return properties.getProperty("app.url", "http://localhost:3000");
  }

  /**
   * Get browser type
   */
  public String getBrowser() {
    return properties.getProperty("browser", "chrome");
  }

  /**
   * Get implicit wait timeout
   */
  public long getImplicitWait() {
    return Long.parseLong(properties.getProperty("implicit.wait", "10"));
  }

  /**
   * Get explicit wait timeout
   */
  public long getExplicitWait() {
    return Long.parseLong(properties.getProperty("explicit.wait", "15"));
  }

  /**
   * Get test email
   */
  public String getTestEmail() {
    return properties.getProperty("test.email", "testuser@example.com");
  }

  /**
   * Get test password
   */
  public String getTestPassword() {
    return properties.getProperty("test.password", "password123");
  }

  /**
   * Get any property by key
   */
  public String getProperty(String key) {
    return properties.getProperty(key);
  }
}
