package com.municipality.pages;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class ComplaintPage {
  private WebDriver driver;
  private WebDriverWait wait;


  private By titleField = By.xpath("//input[contains(@placeholder, 'Title') or @name='title']");
  private By categoryDropdown = By.xpath("//select[contains(@name, 'category') or contains(@class, 'select')]");
  private By descriptionField = By.xpath("//textarea[contains(@placeholder, 'Describe') or @name='description']");
  private By submitButton = By.xpath("//button[@type='submit']");
  private By successMessage = By.xpath("//div[contains(text(),'Success') or contains(text(),'submitted')]");

  public ComplaintPage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
  }

  public void fileComplaint(String title, String category, String description) {
    // Wait for the form to appear (this fixes the TimeoutException)
    WebElement titleInput = wait.until(ExpectedConditions.visibilityOfElementLocated(titleField));

    titleInput.clear();
    titleInput.sendKeys(title);

    driver.findElement(categoryDropdown).sendKeys(category);
    driver.findElement(descriptionField).sendKeys(description);

    // Click submit
    WebElement btn = wait.until(ExpectedConditions.elementToBeClickable(submitButton));
    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", btn);
  }

  public String getSuccessMessage() {
    try {
      return wait.until(ExpectedConditions.visibilityOfElementLocated(successMessage)).getText();
    } catch (Exception e) {
      return "Message not found";
    }
  }
}