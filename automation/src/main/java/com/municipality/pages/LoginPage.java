package com.municipality.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {

  private WebDriver driver;
  private WebDriverWait wait;

  public LoginPage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
  }

  private By emailInput = By.xpath("//input[@type='email']");
  private By passwordInput = By.xpath("//input[@type='password']");
  private By signInButton = By.xpath("//button[contains(text(),'Sign In')]");
  private By errorMessage = By.xpath("//*[contains(text(),'Invalid') or contains(text(),'error')]");

  public void login(String email, String password) {

    WebElement emailField =
            wait.until(ExpectedConditions.visibilityOfElementLocated(emailInput));
    emailField.clear();
    emailField.sendKeys(email);

    WebElement passwordField =
            wait.until(ExpectedConditions.visibilityOfElementLocated(passwordInput));
    passwordField.clear();
    passwordField.sendKeys(password);

    wait.until(ExpectedConditions.elementToBeClickable(signInButton)).click();
  }

  public boolean isErrorMessageDisplayed() {
    try {
      return wait.until(
              ExpectedConditions.visibilityOfElementLocated(errorMessage)
      ).isDisplayed();
    } catch (Exception e) {
      return false;
    }
  }

  public String getErrorMessage() {
    return driver.findElement(errorMessage).getText();
  }
}
