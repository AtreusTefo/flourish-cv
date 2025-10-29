import asyncio
from playwright.async_api import async_playwright
import json
import time

async def analyze_builder_page():
    """Comprehensive analysis of the builder page to identify errors and issues"""
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context()
        page = await context.new_page()
        
        # Collect console errors
        console_errors = []
        network_errors = []
        
        def handle_console(msg):
            if msg.type in ['error', 'warning']:
                console_errors.append({
                    'type': msg.type,
                    'text': msg.text,
                    'location': msg.location
                })
                print(f"Console {msg.type}: {msg.text}")
        
        def handle_response(response):
            if response.status >= 400:
                network_errors.append({
                    'url': response.url,
                    'status': response.status,
                    'status_text': response.status_text
                })
                print(f"Network error: {response.status} - {response.url}")
        
        page.on('console', handle_console)
        page.on('response', handle_response)
        
        try:
            print("Navigating to builder page...")
            await page.goto('http://localhost:8081/builder', wait_until='networkidle')
            
            # Wait for page to load
            await page.wait_for_timeout(3000)
            
            print("Analyzing page structure...")
            
            # Check if main components are present
            form_present = await page.locator('[data-testid="cv-form"], .cv-form, form').count() > 0
            preview_present = await page.locator('[data-testid="cv-preview"], .cv-preview').count() > 0
            
            print(f"Form component present: {form_present}")
            print(f"Preview component present: {preview_present}")
            
            # Check for error messages on page
            error_elements = await page.locator('.error, .text-red-500, .text-destructive, [role="alert"]').all()
            visible_errors = []
            for error in error_elements:
                if await error.is_visible():
                    text = await error.text_content()
                    visible_errors.append(text)
            
            print(f"Visible error messages: {visible_errors}")
            
            # Test form interactions
            print("Testing form interactions...")
            
            # Try to find and interact with form fields
            name_field = page.locator('input[name="fullName"], input[placeholder*="name" i], input[placeholder*="Name"]').first
            email_field = page.locator('input[name="email"], input[type="email"], input[placeholder*="email" i]').first
            
            form_fields_found = {
                'name_field': await name_field.count() > 0,
                'email_field': await email_field.count() > 0
            }
            
            print(f"Form fields found: {form_fields_found}")
            
            # Test form validation
            if await name_field.count() > 0:
                print("Testing name field validation...")
                await name_field.fill("")
                await name_field.blur()
                await page.wait_for_timeout(1000)
                
                # Check for validation errors
                validation_errors = await page.locator('.error, .text-red-500, .text-destructive').all()
                validation_messages = []
                for error in validation_errors:
                    if await error.is_visible():
                        text = await error.text_content()
                        validation_messages.append(text)
                
                print(f"Validation messages after clearing name: {validation_messages}")
            
            # Test save functionality
            print("Testing save functionality...")
            save_button = page.locator('button:has-text("Save"), button[data-testid="save-button"]').first
            
            if await save_button.count() > 0:
                print("Save button found, testing click...")
                await save_button.click()
                await page.wait_for_timeout(2000)
                
                # Check for success/error messages after save
                toast_messages = await page.locator('.toast, .sonner-toast, [data-sonner-toast]').all()
                toast_texts = []
                for toast in toast_messages:
                    if await toast.is_visible():
                        text = await toast.text_content()
                        toast_texts.append(text)
                
                print(f"Toast messages after save: {toast_texts}")
            else:
                print("Save button not found")
            
            # Check for JavaScript errors in browser
            js_errors = await page.evaluate("""
                () => {
                    const errors = window.jsErrors || [];
                    return errors;
                }
            """)
            
            # Generate analysis report
            analysis_report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'page_loaded': True,
                'console_errors': console_errors,
                'network_errors': network_errors,
                'visible_errors': visible_errors,
                'form_fields_found': form_fields_found,
                'components_present': {
                    'form': form_present,
                    'preview': preview_present
                },
                'validation_test_results': validation_messages if 'validation_messages' in locals() else [],
                'save_test_results': toast_texts if 'toast_texts' in locals() else [],
                'javascript_errors': js_errors
            }
            
            print("\n=== BUILDER PAGE ANALYSIS REPORT ===")
            print(json.dumps(analysis_report, indent=2))
            
            return analysis_report
            
        except Exception as e:
            print(f"Error during analysis: {str(e)}")
            return {
                'error': str(e),
                'console_errors': console_errors,
                'network_errors': network_errors
            }
        
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(analyze_builder_page())