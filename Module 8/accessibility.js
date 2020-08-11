/**
 * Accessibility test suite
 *
 * Covers keyboard navigation for non-touch devices
 */
describe("accessibility", () => {
  before(() => {
    browser.url("/");

    // Wait for orders to be loaded and displayed
    const ordersList = $("[data-testid='orders-list']");
    expect(ordersList).toBeDisplayed();
  });

  describe("keyboard navigation", () => {
    it("should focus on My Orders menu item when tabbing first time", () => {
      // Tabs to the first menu item
      //
      // This bit can be flaky and possibly writing a utility to "tabUntil"
      // the desired element is focused could work more reliably. I've noticed
      // when this fails, it seems like the tab index is off by one.
      browser.keys("Tab");
      const focused = browser.focused();

      expect(focused).toHaveHref("/orders");
      expect(focused).toHaveText("My Orders");
    });

    it("should focus on first order next", () => {
      // This will focus on the first order in the list
      browser.keys("Tab");
      const focused = browser.focused();

      expect(focused).toHaveTextContaining("Order #1001");
    });

    it("should navigate to order when selected with Enter key", () => {
      // Hitting "enter" will activate the link
      browser.keys("Enter");

      // Make sure we navigated to the right page
      expect(browser).toHaveUrl(
        new URL("orders/1001", browser.config.baseUrl).toString()
      );

      // Wait for any order data to load
      const title = $("ion-title*=Order #1001");
      expect(title).toBeDisplayed();
    });

    it("should be able to focus on notification toggle", () => {
      // Wait for Ionic page transition
      // without this, the test will be quite flaky
      browser.pause(500);

      // Tabbing twice, once on the back button,
      // the next onto the toggle button
      browser.keys(["Tab", "Tab"]);

      // Ensure the toggle button is what has focus
      const focused = browser.focused();
      expect(focused).toHaveAttribute(
        "aria-label",
        "Toggle Push Notifications"
      );
      expect(focused).toHaveAttribute("aria-checked", "false");
    });

    it("should be able to toggle notifications", () => {
      browser.keys("Enter");

      // A headless browser cannot show notifications, so we cannot toggle it to "true"
      // and rather than mock the whole Permissions Request sequence, all we need
      // to check is if the warn toast is shown, because the Enter key worked.
      if (browser.isHeadless()) {
        const toast = $("ion-toast[data-presented");
        expect(toast).toBeDisplayed();
      } else {
        const focused = browser.focused();
        expect(focused).toHaveAttribute("aria-checked", "true");
      }
    });
  });
});
