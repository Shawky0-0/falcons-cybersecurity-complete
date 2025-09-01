// FalconsData - lightweight in-memory data layer used across pages
// Provides safe, deterministic data for offline/static hosting.
(function () {
	if (window.FalconsData && typeof window.FalconsData === 'object') {
		return; // Already initialized
	}

	// Helpers
	const clone = (v) => JSON.parse(JSON.stringify(v));
	const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

	// Seed Data (edit freely)
	const blogs = [
		{
			id: 'intro-threat-modeling',
			title: 'Threat Modeling 101: STRIDE vs. PASTA',
			excerpt: 'A practical guide to modeling threats before they become incidents.',
			author: 'Falcons Team',
			date: '2025-02-10',
			tags: ['appsec', 'architecture', 'blue-team'],
			url: '#',
		},
		{
			id: 'ctf-toolbelt',
			title: 'Your CTF Toolbelt: From nmap to pwntools',
			excerpt: 'Tools, tips, and tactics for solving CTFs efficiently.',
			author: 'CTF Unit',
			date: '2025-01-22',
			tags: ['ctf', 'recon', 'exploitation'],
			url: '#',
		},
	];

	const events = [
		{ id: 'bootcamp-01', name: 'Falcons Bootcamp: Web Security', date: '2025-03-05', location: 'CIC, New Cairo', link: '#'},
		{ id: 'ctf-qualifiers', name: 'Falcons CTF Qualifiers', date: '2025-04-12', location: 'Online', link: '#'},
	];

	const resources = [
		{ id: 'nmap-cheatsheet', title: 'Nmap Cheatsheet', type: 'guide', link: 'https://nmap.org/book/man-briefoptions.html', tags: ['recon'] },
		{ id: 'mitre-attck', title: 'MITRE ATT&CK Matrix', type: 'reference', link: 'https://attack.mitre.org/', tags: ['threat-intel'] },
	];

	// Non-repeating hard questions (example subset)
	const questions = [
		{
			id: 'nmap-http-scripts',
			text: 'Which nmap NSE category helps to enumerate HTTP titles and headers?',
			choices: ['default', 'safe', 'discovery', 'intrusive'],
			answer: 2,
			explanation: 'discovery scripts generally enumerate information without active exploitation.',
		},
		{
			id: 'sqlmap-technique',
			text: 'In sqlmap, which option limits the injection technique to time-based only?',
			choices: ['--technique=T', '--risk=3', '--level=5', '--time-sec=10'],
			answer: 0,
			explanation: '--technique=T restricts payloads to time-based blind.',
		},
		{
			id: 'burp-infiltrator',
			text: 'Burp Suite: Which tool discovers hidden endpoints by wordlist fuzzing?',
			choices: ['Repeater', 'Intruder', 'Sequencer', 'Comparer'],
			answer: 1,
			explanation: 'Intruder automates fuzzing attacks with payload positions.',
		},
	];

	const leaderboard = [
		{ name: 'Raptor', score: 980 },
		{ name: 'Falconer', score: 910 },
		{ name: 'SkyGuard', score: 860 },
	];

	const applications = [];

	// API
	const api = {
			// Dynamic snapshot (read-only clone)
			get data() {
				return {
					blogs: clone(blogs),
					events: clone(events),
					resources: clone(resources),
					questions: clone(questions),
					leaderboard: clone(leaderboard),
					applications: clone(applications),
				};
			},
		// Blog
		getBlogs(sorted = true) {
			const list = clone(blogs);
			return sorted ? list.sort(byDateDesc) : list;
		},
		getBlogById(id) {
			return clone(blogs.find(b => b.id === id) || null);
		},

		// Events
		getEvents(sorted = true) {
			const list = clone(events);
			return sorted ? list.sort(byDateDesc) : list;
		},
		getUpcomingEvents() {
			const now = new Date();
			return clone(events.filter(e => new Date(e.date) >= now)).sort(byDateDesc);
		},

		// Resources
		getResources() {
			return clone(resources);
		},
		searchResources(term) {
			const t = String(term || '').toLowerCase();
			return clone(resources.filter(r => r.title.toLowerCase().includes(t) || r.tags.join(' ').toLowerCase().includes(t)));
		},

		// Questions
		getQuestions(shuffle = true) {
			const list = clone(questions);
			if (!shuffle) return list;
			for (let i = list.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[list[i], list[j]] = [list[j], list[i]];
			}
			return list;
		},

		// Leaderboard
		getLeaderboard(limit = 10) {
			return clone(leaderboard.sort((a, b) => b.score - a.score).slice(0, limit));
		},
		submitScore(name, score) {
			leaderboard.push({ name: String(name).slice(0, 24) || 'Anonymous', score: Number(score) || 0 });
			return this.getLeaderboard();
		},

		// Applications (Join form)
		submitApplication(payload) {
			const clean = clone(payload || {});
			clean.id = `app_${Date.now()}`;
			clean.createdAt = new Date().toISOString();
			applications.push(clean);
			return clone(clean);
		},
		getApplications() {
			return clone(applications);
		},

		// Site stats
		getStats() {
				return {
					// New keys
					blogs: blogs.length,
					events: events.length,
					resources: resources.length,
					questions: questions.length,
					leaderboard: leaderboard.length,
					applications: applications.length,
					// Legacy keys (for diagnostics pages)
					totalBlogs: blogs.length,
					totalEvents: events.length,
					totalResources: resources.length,
					totalQuestions: questions.length,
					totalPlayers: leaderboard.length,
					generatedAt: new Date().toISOString(),
				};
		},

		// Search everything
		search(term) {
			const t = String(term || '').toLowerCase();
			return {
				blogs: blogs.filter(b => (b.title + ' ' + b.excerpt + ' ' + b.tags.join(' ')).toLowerCase().includes(t)),
				events: events.filter(e => (e.name + ' ' + e.location).toLowerCase().includes(t)),
				resources: resources.filter(r => (r.title + ' ' + r.tags.join(' ')).toLowerCase().includes(t)),
			};
		},
    
			// Persist new in-memory data (used by test/demo pages)
			saveData(newData = {}) {
				if (Array.isArray(newData.blogs)) {
					blogs.length = 0; blogs.push(...clone(newData.blogs));
				}
				if (Array.isArray(newData.events)) {
					events.length = 0; events.push(...clone(newData.events));
				}
				if (Array.isArray(newData.resources)) {
					resources.length = 0; resources.push(...clone(newData.resources));
				}
				if (Array.isArray(newData.questions)) {
					questions.length = 0; questions.push(...clone(newData.questions));
				}
				if (Array.isArray(newData.leaderboard)) {
					leaderboard.length = 0; leaderboard.push(...clone(newData.leaderboard));
				}
				if (Array.isArray(newData.applications)) {
					applications.length = 0; applications.push(...clone(newData.applications));
				}
				return this.getStats();
			}
	};

	Object.freeze(api);
	window.FalconsData = api;
})();

