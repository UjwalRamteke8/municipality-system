package com.municipality.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.OutputType;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * ScreenshotHelper - Utility to capture screenshots on test failures
 */
public class ScreenshotHelper {

  private static final String SCREENSHOT_DIR = "screenshots/";

  /**
   * Take screenshot and save to file
   */
  public static String takeScreenshot(WebDriver driver, String testName) {
    try {
      // Create screenshots directory if not exists
      Files.createDirectories(Paths.get(SCREENSHOT_DIR));

      // Generate timestamp for unique filename
      String timestamp = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss").format(new Date());
      String fileName = testName + "_" + timestamp + ".png";
      String filePath = SCREENSHOT_DIR + fileName;

      // Take screenshot
      TakesScreenshot screenshot = (TakesScreenshot) driver;
      File srcFile = screenshot.getScreenshotAs(OutputType.FILE);
      File destFile = new File(filePath);

      // Copy file to destination
      Files.copy(srcFile.toPath(), destFile.toPath());

      System.out.println("Screenshot saved: " + filePath);
      return filePath;

    } catch (IOException e) {
      System.out.println("Failed to capture screenshot: " + e.getMessage());
      return null;
    }
  }

  /**
   * Take screenshot and return as Base64 string (useful for reports)
   */
  public static String takeScreenshotAsBase64(WebDriver driver) {
    try {
      TakesScreenshot screenshot = (TakesScreenshot) driver;
      return screenshot.getScreenshotAs(OutputType.BASE64);
    } catch (Exception e) {
      System.out.println("Failed to capture screenshot as Base64: " + e.getMessage());
      return null;
    }
  }
}
