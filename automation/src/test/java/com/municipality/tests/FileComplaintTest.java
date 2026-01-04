package com.municipality.tests;

import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import com.municipality.base.BaseClass;
import com.municipality.pages.*;

public class FileComplaintTest extends BaseClass {
  private LoginPage loginPage;
  private DashboardPage dashboardPage;
  private ComplaintPage complaintPage;

  @BeforeMethod
  public void setupPages() {
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    complaintPage = new ComplaintPage(driver);
  }

  @Test(priority = 1)
  public void testFileComplaintWithValidDetails() {
    // 1. Login
    loginPage.login(configReader.getTestEmail(), configReader.getTestPassword());

    // 2. Verify Login
    Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Login failed - Dashboard not loaded");

    // 3. Navigate
    dashboardPage.clickFileComplaint();
    // 4. File Complaint (Pass Title, Category, Description)
    // Ensure "Pothole" matches exactly one of the options in your dropdown
    complaintPage.fileComplaint("Huge Pothole", "Pothole", "Dangerous pothole on Main Street.");

    // 5. Verify Success
    String successMsg = complaintPage.getSuccessMessage().toLowerCase();
    Assert.assertTrue(successMsg.contains("success") || successMsg.contains("submitted"),
            "Expected success message not found. Found: " + successMsg);
  }
}