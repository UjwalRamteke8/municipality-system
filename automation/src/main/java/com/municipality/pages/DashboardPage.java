package com.municipality.pages;

import java.time.Duration;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DashboardPage {

  private WebDriver driver;
  private WebDriverWait wait;

  public DashboardPage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
  }

  // Update these specific locators in DashboardPage.java
  private By availableServicesNavLink = By.xpath("//a[contains(@href, 'citizen-services')]");

  // Flex-locator: Finds the link inside the card that mentions 'Register' or 'Complaint'
  private By startComplaintButton = By.xpath("//h3[contains(text(),'File Complaint') or contains(text(),'Register')]/parent::div//a");
  private By citizenBadge = By.xpath("//span[contains(text(),'CITIZEN')] | //nav//img");


  // --- ACTIONS ---

  public boolean isDashboardLoaded() {
    try {
      wait.until(ExpectedConditions.urlContains("3000")); // Ensure we are on the app
      wait.until(ExpectedConditions.visibilityOfElementLocated(citizenBadge));
      return true;
    } catch (Exception e) {
      System.out.println("Dashboard verification failed. Current URL: " + driver.getCurrentUrl());
      return false;
    }
  }

  public void clickFileComplaint() {
    // 1. Go to Services Page
    WebElement navLink = wait.until(ExpectedConditions.elementToBeClickable(availableServicesNavLink));
    ((JavascriptExecutor) driver).executeScript("arguments[0].click();", navLink);

    // 2. Wait for cards to load
    wait.until(ExpectedConditions.urlContains("citizen-services"));

    // 3. Find and click the ACCESS NOW link on the specific card
    // Target the first link in the card container
    WebElement btn = wait.until(ExpectedConditions.presenceOfElementLocated(startComplaintButton));

    JavascriptExecutor js = (JavascriptExecutor) driver;
    js.executeScript("arguments[0].scrollIntoView({block: 'center'});", btn);
    js.executeScript("arguments[0].click();", btn);
  }
}