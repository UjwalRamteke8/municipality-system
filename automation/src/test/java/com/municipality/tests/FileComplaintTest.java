package com.municipality.tests;

import org.testng.Assert;
import org.testng.annotations.Test;
import com.municipality.base.BaseClass;
import com.municipality.pages.LoginPage;
import com.municipality.pages.DashboardPage;
import com.municipality.pages.ComplaintPage;

/**
 * Complaint Test - Test cases for complaint filing functionality
 */
public class ComplaintTest extends BaseClass {

  private LoginPage loginPage;
  private DashboardPage dashboardPage;
  private ComplaintPage complaintPage;

  /**
   * Test case 1: File complaint with valid details
   */
  @Test(priority = 1, description = "File complaint with valid details")
  public void testFileComplaintWithValidDetails() {
    // Login first
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    complaintPage = new ComplaintPage(driver);

    String email = configReader.getTestEmail();
    String password = configReader.getTestPassword();

    loginPage.login(email, password);

    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // Verify login and navigate to complaint page
    Assert.assertTrue(dashboardPage.isDashboardLoaded(), "Dashboard should be loaded");

    dashboardPage.clickFileComplaint();

    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // File complaint
    complaintPage.fileComplaint("Pothole", "Severe pothole at Main Street", "");

    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // Verify success message
    String successMsg = complaintPage.getSuccessMessage();
    Assert.assertTrue(successMsg.contains("success") || successMsg.contains("submitted"),
        "Success message should be displayed");

    // Verify complaint ID is generated
    String complaintId = complaintPage.getComplaintId();
    Assert.assertNotNull(complaintId, "Complaint ID should be generated");
  }

  /**
   * Test case 2: File complaint with attachment
   */
  @Test(priority = 2, description = "File complaint with file attachment")
  public void testFileComplaintWithAttachment() {
    // Login first
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    complaintPage = new ComplaintPage(driver);

    String email = configReader.getTestEmail();
    String password = configReader.getTestPassword();

    loginPage.login(email, password);

    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    dashboardPage.clickFileComplaint();

    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // File complaint with attachment
    complaintPage.fileComplaint("Streetlight", "Street light not working", "path/to/image.png");

    try {
      Thread.sleep(2000);
    } catch (InterruptedException e) {
      e.printStackTrace();
    }

    // Verify success
    Assert.assertTrue(complaintPage.getSuccessMessage().contains("success"),
        "Complaint should be filed successfully with attachment");
  }
}
