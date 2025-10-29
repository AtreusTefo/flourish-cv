import asyncio
from playwright.async_api import async_playwright
import json
import time

async def test_authenticated_save():
    """Test save functionality with authentication"""
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        console_messages = []
        
        def handle_console(msg):
            console_messages.append({
                'type': msg.type,
                'text': msg.text,
                'timestamp': time.strftime('%H:%M:%S')
            })
            print(f"Console {msg.type}: {msg.text}")
        
        page.on('console', handle_console)
        
        try:
            print("Step 1: Navigate to auth page...")
            await page.goto('http://localhost:8081/auth', wait_until='networkidle')
            await page.wait_for_timeout(2000)
            
            print("Step 2: Sign up with test credentials...")
            
            # Switch to sign up mode
            signup_link = page.locator('button:has-text("Don\'t have an account? Sign up")')
            if await signup_link.count() > 0:
                await signup_link.click()
                await page.wait_for_timeout(1000)
            
            # Fill sign up form
            await page.fill('#fullName', 'Test User')
            await page.fill('#email', f'test{int(time.time())}@example.com')  # Unique email
            await page.fill('#password', 'TestPassword123!')
            
            # Submit sign up
            submit_button = page.locator('button[type="submit"]')
            await submit_button.click()
            await page.wait_for_timeout(3000)
            
            # Check if we need to verify email or if we're redirected
            current_url = page.url
            print(f"Current URL after signup: {current_url}")
            
            # If still on auth page, try to sign in instead
            if '/auth' in current_url:
                print("Trying to sign in with existing credentials...")
                
                # Switch to sign in mode
                signin_link = page.locator('button:has-text("Already have an account? Sign in")')
                if await signin_link.count() > 0:
                    await signin_link.click()
                    await page.wait_for_timeout(1000)
                
                # Use a known test account
                await page.fill('#email', 'test@example.com')
                await page.fill('#password', 'password123')
                
                submit_button = page.locator('button[type="submit"]')
                await submit_button.click()
                await page.wait_for_timeout(3000)
            
            print("Step 3: Navigate to builder page...")
            await page.goto('http://localhost:8081/builder', wait_until='networkidle')
            await page.wait_for_timeout(3000)
            
            print("Step 4: Fill out form data...")
            
            # Fill personal information
            await page.fill('#fullName', 'John Doe')
            await page.fill('#email', 'john@example.com')
            await page.fill('#phone', '+1 (555) 123-4567')
            
            # Add some summary
            summary_tab = page.locator('button:has-text("Summary")')
            if await summary_tab.count() > 0:
                await summary_tab.click()
                await page.wait_for_timeout(1000)
                
                summary_textarea = page.locator('textarea[placeholder*="summary"], textarea[placeholder*="Summary"]')
                if await summary_textarea.count() > 0:
                    await summary_textarea.fill('Experienced professional with strong skills in software development.')
            
            await page.wait_for_timeout(2000)
            
            print("Step 5: Test save functionality...")
            
            # Click save button
            save_button = page.locator('button:has-text("Save")')
            save_button_found = await save_button.count() > 0
            
            print(f"Save button found: {save_button_found}")
            
            if save_button_found:
                print("Clicking save button...")
                await save_button.click()
                await page.wait_for_timeout(5000)  # Wait longer for save operation
                
                # Check for toast messages with multiple selectors
                toast_selectors = [
                    '.sonner-toast',
                    '[data-sonner-toast]',
                    '.toast',
                    '[role="status"]',
                    '.Toastify__toast',
                    '[data-testid*="toast"]'
                ]
                
                toast_messages = []
                for selector in toast_selectors:
                    toasts = await page.locator(selector).all()
                    for toast in toasts:
                        if await toast.is_visible():
                            text = await toast.text_content()
                            if text and text.strip():
                                toast_messages.append(text.strip())
                
                print(f"Toast messages found: {toast_messages}")
                
                # Also check for any error messages
                error_messages = []
                error_selectors = [
                    '.error',
                    '[role="alert"]',
                    '.alert-error',
                    '.text-red-500',
                    '.text-destructive'
                ]
                
                for selector in error_selectors:
                    errors = await page.locator(selector).all()
                    for error in errors:
                        if await error.is_visible():
                            text = await error.text_content()
                            if text and text.strip():
                                error_messages.append(text.strip())
                
                print(f"Error messages found: {error_messages}")
            
            # Check authentication status
            print("Step 6: Check authentication status...")
            
            # Look for user indicators
            user_indicators = await page.locator('[data-testid*="user"], .user-info, button:has-text("Logout")').all()
            user_authenticated = len(user_indicators) > 0
            
            print(f"User appears authenticated: {user_authenticated}")
            
            # Generate test report
            test_report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'authentication': {
                    'user_authenticated': user_authenticated,
                    'final_url': page.url
                },
                'save_functionality': {
                    'save_button_found': save_button_found,
                    'toast_messages': toast_messages,
                    'error_messages': error_messages
                },
                'console_messages': console_messages[-10:]  # Last 10 messages
            }
            
            print("\n=== AUTHENTICATED SAVE TEST REPORT ===")
            print(json.dumps(test_report, indent=2))
            
            return test_report
            
        except Exception as e:
            print(f"Error during test: {str(e)}")
            return {
                'error': str(e),
                'console_messages': console_messages
            }
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(test_authenticated_save())