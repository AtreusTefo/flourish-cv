import asyncio
from playwright.async_api import async_playwright
import json
import time

async def test_authenticated_builder():
    """Test builder page with authentication"""
    
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
            # First, go to auth page and sign up/login
            print("Navigating to auth page...")
            await page.goto('http://localhost:8081/auth', wait_until='networkidle')
            await page.wait_for_timeout(2000)
            
            # Try to sign up with test credentials
            print("Attempting to sign up...")
            
            # Fill in signup form
            email_field = page.locator('input[type="email"]').first
            password_field = page.locator('input[type="password"]').first
            name_field = page.locator('input[placeholder*="name" i], input[name*="name"]').first
            
            if await email_field.count() > 0:
                await email_field.fill("test@example.com")
            
            if await password_field.count() > 0:
                await password_field.fill("testpassword123")
                
            if await name_field.count() > 0:
                await name_field.fill("Test User")
            
            # Look for signup button
            signup_button = page.locator('button:has-text("Sign Up"), button:has-text("Create Account")').first
            
            if await signup_button.count() > 0:
                print("Clicking signup button...")
                await signup_button.click()
                await page.wait_for_timeout(3000)
            else:
                print("Signup button not found, trying login...")
                login_button = page.locator('button:has-text("Sign In"), button:has-text("Login")').first
                if await login_button.count() > 0:
                    await login_button.click()
                    await page.wait_for_timeout(3000)
            
            # Check current URL to see if we're redirected
            current_url = page.url
            print(f"Current URL after auth attempt: {current_url}")
            
            # Now navigate to builder page
            print("Navigating to builder page...")
            await page.goto('http://localhost:8081/builder', wait_until='networkidle')
            await page.wait_for_timeout(3000)
            
            # Check if we're still on builder or redirected to auth
            final_url = page.url
            print(f"Final URL: {final_url}")
            
            if '/auth' in final_url:
                print("Redirected to auth - authentication required but failed")
                return {
                    'error': 'Authentication required but failed',
                    'redirected_to_auth': True,
                    'console_errors': console_errors,
                    'network_errors': network_errors
                }
            
            # Analyze builder page structure
            print("Analyzing builder page structure...")
            
            # Check for main components
            form_tabs = await page.locator('.tabs, [role="tablist"]').count()
            form_inputs = await page.locator('input, textarea, select').count()
            preview_area = await page.locator('.preview, [data-testid*="preview"]').count()
            
            # Check for specific CV form elements
            personal_info_section = await page.locator('text="Personal Information", text="Personal Info"').count()
            experience_section = await page.locator('text="Experience", text="Work Experience"').count()
            education_section = await page.locator('text="Education"').count()
            skills_section = await page.locator('text="Skills"').count()
            
            # Check for navigation/save elements
            save_button = await page.locator('button:has-text("Save")').count()
            navigation_bar = await page.locator('nav, .navigation, [data-testid*="nav"]').count()
            
            # Test form functionality
            print("Testing form functionality...")
            
            # Try to find and fill name field
            name_input = page.locator('input[placeholder*="name" i], input[name*="fullName"]').first
            if await name_input.count() > 0:
                await name_input.fill("John Doe")
                await page.wait_for_timeout(1000)
                
                # Check if preview updates
                preview_content = await page.locator('.preview, [data-testid*="preview"]').text_content()
                name_in_preview = "John Doe" in (preview_content or "")
                print(f"Name appears in preview: {name_in_preview}")
            
            # Generate comprehensive report
            analysis_report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'authentication_status': 'success' if '/builder' in final_url else 'failed',
                'page_loaded': '/builder' in final_url,
                'console_errors': console_errors,
                'network_errors': network_errors,
                'components_analysis': {
                    'form_tabs_count': form_tabs,
                    'form_inputs_count': form_inputs,
                    'preview_area_count': preview_area,
                    'sections_found': {
                        'personal_info': personal_info_section > 0,
                        'experience': experience_section > 0,
                        'education': education_section > 0,
                        'skills': skills_section > 0
                    },
                    'navigation_elements': {
                        'save_button': save_button > 0,
                        'navigation_bar': navigation_bar > 0
                    }
                },
                'functionality_test': {
                    'name_input_works': await name_input.count() > 0 if 'name_input' in locals() else False,
                    'preview_updates': locals().get('name_in_preview', False)
                }
            }
            
            print("\n=== AUTHENTICATED BUILDER ANALYSIS REPORT ===")
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
    asyncio.run(test_authenticated_builder())