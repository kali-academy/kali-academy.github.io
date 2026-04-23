// ===== KALI ACADEMY UNIFIED DATA STORE =====
// Single Source of Truth for all data counts
// This module exposes accurate counts from loaded databases

(function() {
  'use strict';

  var KaliData = {
    _initialized: false,
    _scenariosLoaded: false,
    _lessonsLoaded: false,

    // Default counts (before data loads)
    defaults: {
      commands: 500,
      lessons: 100,
      tools: 500,
      scenarios: 121,
      tracks: 12
    },

    // Get current counts
    getCounts: function() {
      return {
        commands: this.commands,
        lessons: this.lessons,
        tools: this.tools,
        scenarios: this.scenarios,
        tracks: this.tracks
      };
    },

    // Getters with fallback
    get commands() {
      if (window.COMMANDS_DB && window.COMMANDS_DB.length) {
        return window.COMMANDS_DB.length;
      }
      return this.defaults.commands;
    },

    get lessons() {
      if (window.TUTORIALS_DB && window.TUTORIALS_DB.length) {
        return window.TUTORIALS_DB.length;
      }
      if (window.LESSON_STEPS && window.LESSON_STEPS.length) {
        return window.LESSON_STEPS.length;
      }
      return this.defaults.lessons;
    },

    get tools() {
      if (window.TOOLS_DB && window.TOOLS_DB.length) {
        return window.TOOLS_DB.length;
      }
      return this.defaults.tools;
    },

    get scenarios() {
      // This is the CORRECT total: SCENARIOS (71) + LESSON_STEPS (50) = 121
      var sc = 0;
      if (window.SCENARIOS && window.SCENARIOS.length) {
        sc = window.SCENARIOS.length;
      }
      var ls = 0;
      if (window.LESSON_STEPS && window.LESSON_STEPS.length) {
        ls = window.LESSON_STEPS.length;
      }
      return sc + ls;
    },

    get tracks() {
      return this.defaults.tracks;
    },

    // Update all count displays on the page
    updateAllDisplays: function() {
      var counts = this.getCounts();

      // Hero counts
      var heroCmds = document.getElementById('hero-count-commands');
      var heroLess = document.getElementById('hero-count-lessons');
      var heroTools = document.getElementById('hero-count-tools');
      if (heroCmds) heroCmds.textContent = counts.commands;
      if (heroLess) heroLess.textContent = counts.lessons;
      if (heroTools) heroTools.textContent = counts.tools;

      // Stat cards
      ['stat-commands', 'stat-lessons', 'stat-tools', 'stat-scenarios', 'stat-tracks'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) {
          el.setAttribute('data-count', String(counts[id.replace('stat-', '')]));
          el.textContent = counts[id.replace('stat-', '')];
        }
      });

      // Scenarios count in other pages
      var scenariosCountEl = document.getElementById('scenarios-count');
      if (scenariosCountEl) {
        scenariosCountEl.textContent = counts.scenarios;
      }
    },

    // Register completion callback
    onReady: function(callback) {
      if (this._initialized) {
        callback(this.getCounts());
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          callback(KaliData.getCounts());
        });
      }
    }
  };

  // Mark as initialized
  KaliData._initialized = true;

  // Expose globally
  window.KaliData = KaliData;
  window.kaliGetCounts = function() { return KaliData.getCounts(); };

  // Auto-update when data loads
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.SCENARIOS !== 'undefined' || typeof window.LESSON_STEPS !== 'undefined') {
      setTimeout(function() {
        KaliData.updateAllDisplays();
      }, 500);
    }
  });

  // Listen for data load events
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(function() {
      KaliData.updateAllDisplays();
    }, 500);
  }

})();