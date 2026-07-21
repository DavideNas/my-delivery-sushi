import { test, expect } from '@playwright/test'

test.describe('E2E: Multi-Step Checkout Flow with Forward/Backward Navigation', () => {

  test('Should fill out the form, navigate forward and backward, and complete the order', async ({ page }) => {

    // 1. Inject a valid 'user' token before Vue loads.
    // The token must contain the word 'user' for authService.validateToken() to pass
    await page.addInitScript(() => {
      window.localStorage.setItem('auth_token', 'mocked-jwt-token-for-user')
    })

    // 2. Go to home page
    await page.goto('/')

    // 3. Add a product to your cart (use your real selector for the add button)
    // E.g. if you have a button with the text "Add" or a specific icon
    const addBtn = page.locator('[data-test="add-to-cart-btn"]').first()
    await expect(addBtn).toBeVisible({ timeout: 10000 })
    await addBtn.click()

    // 4. Open the cart (e.g., via the cart icon in the header)
    const openCartBtn = page.locator('[data-test="open-cart-btn"]').first()
    await expect(openCartBtn).toBeVisible()
    await openCartBtn.click()

    // 5. Start the checkout
    const proceedBtn = page.locator('[data-test="proceed-to-checkout-btn"]')
    await expect(proceedBtn).toBeVisible()
    await proceedBtn.click()

    /**
     * STEP 1: Delivery Address
     */
    const fullNameInput = page.getByLabel(/nome|full name/i)
    await expect(fullNameInput).toBeVisible({ timeout: 10000 })

    // 6. Fill in the Address (Step 1)
    await fullNameInput.fill('Mario Rossi')
    await page.getByLabel(/via|indirizzo|street/i).fill('Via Roma 12')
    await page.getByLabel(/città|city/i).fill('Milano')
    await page.getByLabel(/telefono|phone/i).fill('3451234567')

    // Go to Step 2 (Payment)
    await page.locator('[data-test="address-submit"]').click()

    /**
     * STEP 1 <-> STEP 2: Navigate Back and Verify Persistence
     */
    // 7. Go back from Step 2 to Step 1 to check data persistence
    await page.locator('[data-test="payment-back"]').click()

    // Verify that the fields have retained the entered values
    await expect(page.locator('[data-test="address-fullname"] input')).toHaveValue('Mario Rossi')
    await expect(page.getByLabel(/via|indirizzo|street/i)).toHaveValue('Via Roma 12')

    // Return to Step 2 (Payment)
    await page.locator('[data-test="address-submit"]').click()

    /**
     * STEP 2: Payment Setup
     */
    // 8. Configure Payment (Step 2)
    // Select Credit Card
    const creditCardRadio = page.locator('[data-test="pay-method-card"] input, [data-test="pay-method-card"] .v-selection-control__wrapper').first()
    await creditCardRadio.click()

    // Wait for the v-expand-transition to open and the card input to become visible
    // await page.locator('[data-test="card-number"]').waitFor({ state: 'visible' })
    const cardNumberInput = page.locator('[data-test="card-number"] input')

    await expect(cardNumberInput).toBeVisible({ timeout: 5000 })
    await cardNumberInput.fill('1234567812345678')

    // Vuetify set the placeholder directly on nativeinput nativo
    await page.getByLabel(/scadenza|expiry/i).fill('12/29')
    await page.getByLabel(/cvc|cvv/i).fill('999')

    // Go to Step 3 (Summary)
    await page.locator('[data-test="payment-submit"]').click()
    await expect(page.locator('text=Verify Your Details')).toBeVisible()

    /**
     * STEP 2 <-> STEP 3: Navigate Back and Verify Payment
     */
    // 9. Go back from Step 3 to Step 2
    await page.locator('[data-test="summary-back"]').click()
    await expect(page.getByRole('heading', { name: /Payment Method|Metodo di Pagamento/i })).toBeVisible()

    // Verify that the credit card method is still selected
    await expect(page.locator('[data-test="card-number"] input')).toHaveValue('1234567812345678')  // or '1234 5678 1234 5678' depending on formatting

    // Return definitively to Step 3 (Summary)
    await page.locator('[data-test="payment-submit"]').click()
    await expect(page.locator('text=Verify Your Details')).toBeVisible()

    /**
     * STEP 3: Confirm Order
     */
    // 10. Confirm the order!
    // If you use window.alert/confirm in your StepSummary, Playwright handles it like this:
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Order sent successfully') // or the text of your success alert
      await dialog.accept()
    })

    await page.locator('[data-test="confirm-order-btn"]').click()

    // 11. Final verification: the dialog has closed and the cart is empty
    await expect(page.locator('text=Completion of Order')).toBeHidden()
  })
})
