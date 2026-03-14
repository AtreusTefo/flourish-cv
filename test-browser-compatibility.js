/**
 * Browser Compatibility Test Script
 * Run this in the browser console to check for compatibility issues
 */

(function() {
  'use strict';

  const results = {
    browser: getBrowserInfo(),
    features: {},
    errors: [],
    warnings: [],
    recommendations: []
  };

  console.log('🔍 Starting Browser Compatibility Test...');

  // Test modern JavaScript features
  testJavaScriptFeatures();
  
  // Test CSS features
  testCSSFeatures();
  
  // Test Web APIs
  testWebAPIs();
  
  // Test performance features
  testPerformanceFeatures();
  
  // Test accessibility features
  testAccessibilityFeatures();

  // Display results
  displayResults();

  function getBrowserInfo() {
    const ua = navigator.userAgent;
    const browser = {
      name: 'Unknown',
      version: 'Unknown',
      engine: 'Unknown'
    };

    if (ua.includes('Chrome') && !ua.includes('Edg')) {
      browser.name = 'Chrome';
      browser.version = ua.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
      browser.engine = 'Blink';
    } else if (ua.includes('Firefox')) {
      browser.name = 'Firefox';
      browser.version = ua.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
      browser.engine = 'Gecko';
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      browser.name = 'Safari';
      browser.version = ua.match(/Version\/(\d+)/)?.[1] || 'Unknown';
      browser.engine = 'WebKit';
    } else if (ua.includes('Edg')) {
      browser.name = 'Edge';
      browser.version = ua.match(/Edg\/(\d+)/)?.[1] || 'Unknown';
      browser.engine = 'Blink';
    }

    return browser;
  }

  function testJavaScriptFeatures() {
    console.log('📝 Testing JavaScript Features...');

    const jsTests = {
      'ES6 Arrow Functions': () => (() => true)(),
      'ES6 Template Literals': () => `test` === 'test',
      'ES6 Destructuring': () => {
        const [a] = [1];
        return a === 1;
      },
      'ES6 Spread Operator': () => [...[1, 2]].length === 2,
      'ES6 Classes': () => {
        class Test {}
        return typeof Test === 'function';
      },
      'Array.includes()': () => [1, 2, 3].includes(2),
      'Array.find()': () => [1, 2, 3].find(x => x === 2) === 2,
      'Array.from()': () => Array.from('abc').length === 3,
      'Object.entries()': () => Object.entries({a: 1}).length === 1,
      'Object.values()': () => Object.values({a: 1})[0] === 1,
      'String.startsWith()': () => 'test'.startsWith('te'),
      'String.endsWith()': () => 'test'.endsWith('st'),
      'Promise': () => typeof Promise !== 'undefined',
      'async/await': async () => {
        try {
          const result = await Promise.resolve(true);
          return result;
        } catch {
          return false;
        }
      },
      'Fetch API': () => typeof fetch !== 'undefined',
      'Map/Set': () => typeof Map !== 'undefined' && typeof Set !== 'undefined'
    };

    Object.entries(jsTests).forEach(([name, test]) => {
      try {
        const result = test();
        if (result instanceof Promise) {
          result.then(res => {
            results.features[name] = res;
            if (!res) results.warnings.push(`${name} not supported`);
          });
        } else {
          results.features[name] = result;
          if (!result) results.warnings.push(`${name} not supported`);
        }
      } catch (error) {
        results.features[name] = false;
        results.errors.push(`${name}: ${error.message}`);
      }
    });
  }

  function testCSSFeatures() {
    console.log('🎨 Testing CSS Features...');

    const cssTests = {
      'CSS Grid': () => CSS.supports('display', 'grid'),
      'CSS Flexbox': () => CSS.supports('display', 'flex'),
      'CSS Variables': () => CSS.supports('--test', 'value'),
      'CSS Gap Property': () => CSS.supports('gap', '10px'),
      'CSS Backdrop Filter': () => CSS.supports('backdrop-filter', 'blur(10px)'),
      'CSS Scroll Behavior': () => CSS.supports('scroll-behavior', 'smooth'),
      'CSS Appearance': () => CSS.supports('appearance', 'none'),
      'CSS User Select': () => CSS.supports('user-select', 'none'),
      'CSS Transform': () => CSS.supports('transform', 'translateX(10px)'),
      'CSS Transition': () => CSS.supports('transition', 'all 0.3s ease')
    };

    Object.entries(cssTests).forEach(([name, test]) => {
      try {
        const result = test();
        results.features[name] = result;
        if (!result) results.warnings.push(`${name} not supported`);
      } catch (error) {
        results.features[name] = false;
        results.errors.push(`${name}: ${error.message}`);
      }
    });
  }

  function testWebAPIs() {
    console.log('🌐 Testing Web APIs...');

    const apiTests = {
      'Local Storage': () => typeof localStorage !== 'undefined',
      'Session Storage': () => typeof sessionStorage !== 'undefined',
      'IndexedDB': () => typeof indexedDB !== 'undefined',
      'Web Workers': () => typeof Worker !== 'undefined',
      'Service Workers': () => 'serviceWorker' in navigator,
      'Geolocation': () => 'geolocation' in navigator,
      'File API': () => typeof File !== 'undefined',
      'Canvas API': () => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
      },
      'WebGL': () => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      },
      'History API': () => !!(window.history && history.pushState),
      'Intersection Observer': () => typeof IntersectionObserver !== 'undefined',
      'Resize Observer': () => typeof ResizeObserver !== 'undefined'
    };

    Object.entries(apiTests).forEach(([name, test]) => {
      try {
        const result = test();
        results.features[name] = result;
        if (!result) results.warnings.push(`${name} not supported`);
      } catch (error) {
        results.features[name] = false;
        results.errors.push(`${name}: ${error.message}`);
      }
    });
  }

  function testPerformanceFeatures() {
    console.log('⚡ Testing Performance Features...');

    const perfTests = {
      'Performance API': () => typeof performance !== 'undefined',
      'Performance Observer': () => typeof PerformanceObserver !== 'undefined',
      'Request Animation Frame': () => typeof requestAnimationFrame !== 'undefined',
      'Request Idle Callback': () => typeof requestIdleCallback !== 'undefined',
      'Passive Event Listeners': () => {
        let passiveSupported = false;
        try {
          const options = {
            get passive() {
              passiveSupported = true;
              return false;
            }
          };
          window.addEventListener('test', null, options);
          window.removeEventListener('test', null, options);
        } catch (err) {
          passiveSupported = false;
        }
        return passiveSupported;
      }
    };

    Object.entries(perfTests).forEach(([name, test]) => {
      try {
        const result = test();
        results.features[name] = result;
        if (!result) results.warnings.push(`${name} not supported`);
      } catch (error) {
        results.features[name] = false;
        results.errors.push(`${name}: ${error.message}`);
      }
    });
  }

  function testAccessibilityFeatures() {
    console.log('♿ Testing Accessibility Features...');

    const a11yTests = {
      'ARIA Support': () => {
        const div = document.createElement('div');
        div.setAttribute('aria-label', 'test');
        return div.getAttribute('aria-label') === 'test';
      },
      'Focus Management': () => typeof document.activeElement !== 'undefined',
      'Screen Reader Detection': () => {
        // Basic check for common screen reader indicators
        return !!(
          window.speechSynthesis ||
          navigator.userAgent.includes('NVDA') ||
          navigator.userAgent.includes('JAWS') ||
          navigator.userAgent.includes('VoiceOver')
        );
      },
      'High Contrast Mode': () => {
        // Check for Windows high contrast mode
        if (window.matchMedia) {
          return window.matchMedia('(prefers-contrast: high)').matches ||
                 window.matchMedia('(-ms-high-contrast: active)').matches;
        }
        return false;
      },
      'Reduced Motion': () => {
        if (window.matchMedia) {
          return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
        return false;
      }
    };

    Object.entries(a11yTests).forEach(([name, test]) => {
      try {
        const result = test();
        results.features[name] = result;
      } catch (error) {
        results.features[name] = false;
        results.errors.push(`${name}: ${error.message}`);
      }
    });
  }

  function displayResults() {
    console.log('\n📊 Browser Compatibility Test Results');
    console.log('=====================================');
    
    console.log(`\n🌐 Browser: ${results.browser.name} ${results.browser.version} (${results.browser.engine})`);
    
    console.log('\n✅ Supported Features:');
    Object.entries(results.features)
      .filter(([_, supported]) => supported)
      .forEach(([feature]) => console.log(`  ✓ ${feature}`));
    
    if (results.warnings.length > 0) {
      console.log('\n⚠️  Warnings:');
      results.warnings.forEach(warning => console.log(`  ⚠️  ${warning}`));
    }
    
    if (results.errors.length > 0) {
      console.log('\n❌ Errors:');
      results.errors.forEach(error => console.log(`  ❌ ${error}`));
    }

    // Generate recommendations
    generateRecommendations();
    
    if (results.recommendations.length > 0) {
      console.log('\n💡 Recommendations:');
      results.recommendations.forEach(rec => console.log(`  💡 ${rec}`));
    }

    console.log('\n📋 Summary:');
    const totalFeatures = Object.keys(results.features).length;
    const supportedFeatures = Object.values(results.features).filter(Boolean).length;
    const compatibilityScore = Math.round((supportedFeatures / totalFeatures) * 100);
    
    console.log(`  Compatibility Score: ${compatibilityScore}%`);
    console.log(`  Supported Features: ${supportedFeatures}/${totalFeatures}`);
    console.log(`  Warnings: ${results.warnings.length}`);
    console.log(`  Errors: ${results.errors.length}`);

    // Return results for programmatic access
    window.browserCompatibilityResults = results;
  }

  function generateRecommendations() {
    const browser = results.browser;
    
    // Browser-specific recommendations
    if (browser.name === 'Safari' && parseInt(browser.version) < 14) {
      results.recommendations.push('Consider updating Safari for better CSS Grid and Flexbox support');
    }
    
    if (browser.name === 'Firefox' && parseInt(browser.version) < 70) {
      results.recommendations.push('Update Firefox for improved CSS custom properties support');
    }
    
    if (browser.name === 'Chrome' && parseInt(browser.version) < 80) {
      results.recommendations.push('Update Chrome for better performance and security features');
    }

    // Feature-specific recommendations
    if (!results.features['CSS Grid']) {
      results.recommendations.push('Add CSS Grid fallbacks using Flexbox');
    }
    
    if (!results.features['CSS Variables']) {
      results.recommendations.push('Consider using CSS preprocessor variables as fallback');
    }
    
    if (!results.features['Fetch API']) {
      results.recommendations.push('Add fetch polyfill for older browsers');
    }
    
    if (!results.features['Promise']) {
      results.recommendations.push('Add Promise polyfill for async operations');
    }

    if (!results.features['Intersection Observer']) {
      results.recommendations.push('Add Intersection Observer polyfill for scroll animations');
    }

    // Performance recommendations
    if (!results.features['Request Idle Callback']) {
      results.recommendations.push('Use setTimeout fallback for non-critical tasks');
    }
    
    if (!results.features['Passive Event Listeners']) {
      results.recommendations.push('Be cautious with scroll event listeners performance');
    }
  }

})();

console.log('✨ Browser compatibility test completed! Check window.browserCompatibilityResults for detailed data.');