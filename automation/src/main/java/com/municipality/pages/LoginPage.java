package com.municipality.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;

/**
 * Login Page - Contains locators and methods for login functionality
 * Page Object Model approach
 */
public class LoginPage {

  private WebDriver driver;

  // Locators
  private By emailInput = By.id("email");
  private By passwordInput = By.id("password");
  private By loginButton = By.xpath("//button[@type='submit' and contains(text(), 'Login')]");
  private By errorMessage = By.className("error-message");
  private By forgotPasswordLink = By.linkText("Forgot Password?");

  // Constructor
  public LoginPage(WebDriver driver) {
    this.driver = driver;
  }

  // Page Actions
  /**
   * Enter email in email input field
   */
  public void enterEmail(String email) {
    driver.findElement(emailInput).sendKeys(email);
  }

  /**
   * Enter password in password input field
   */
  public void enterPassword(String password) {
    driver.findElement(passwordInput).sendKeys(password);
  }

  /**
   * Click on Login button
   */
  public void clickLoginButton() {
    driver.findElement(loginButton).click();
  }

  /**
   * Perform login with email and password
   */
  public void login(String email, String password) {
    enterEmail(email);
    enterPassword(password);
    clickLoginButton();
  }

  /**
   * Get error message text
   */
  public String getErrorMessage() {
    return driver.findElement(errorMessage).getText();
  }

  /**
   * Check if error message is displayed
   */
  public boolean isErrorMessageDisplayed() {
    try {
      return driver.findElement(errorMessage).isDisplayed();
    } catch (Exception e) {
      return false;
    }
  }

  /**
   * Click on Forgot Password link
   */
  public void clickForgotPasswordLink() {
    driver.findElement(forgotPasswordLink).click();
  }
}
