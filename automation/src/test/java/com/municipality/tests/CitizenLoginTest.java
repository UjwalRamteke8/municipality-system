package com.municipality.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.municipality.base.BaseClass;
import com.municipality.pages.LoginPage;
import com.municipality.pages.DashboardPage;

public class CitizenLoginTest extends BaseClass {
  private LoginPage loginPage;
  private DashboardPage dashboardPage;

  @BeforeMethod
  public void setupPages() {
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
  }

  @Test(priority = 1)
  public void testValidLogin() {
    loginPage.login(configReader.getTestEmail(), configReader.getTestPassword());
    // Explicitly check dashboard status
    Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Dashboard failed to load after login");
  }

  @Test(priority = 2)
  public void testInvalidPassword() {
    loginPage.login(configReader.getTestEmail(), "wrongpassword");
    Assert.assertTrue(driver.getCurrentUrl().contains("login"), "Should remain on login page");
  }
}