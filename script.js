// Terminal CLI Interface
class Terminal {
    constructor() {
        this.output = document.getElementById('terminalOutput');
        this.input = document.getElementById('terminalInput');
        this.history = [];
        this.historyIndex = -1;
        this.data = JSON.parse(document.getElementById('projectsData').textContent);

        this.init();
    }

    init() {
        this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.input.focus();
    }

    handleKeyDown(e) {
        if (e.key === 'Enter') {
            this.executeCommand(this.input.value.trim());
            this.history.push(this.input.value.trim());
            this.historyIndex = this.history.length;
            this.input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                this.input.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                this.input.value = '';
            }
        }
    }

    addOutput(command, output, className = '') {
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `
            <span class="prompt">stavya@portfolio:~$</span>
            <span class="command">${command}</span>
        `;

        const outputDiv = document.createElement('div');
        outputDiv.className = `output ${className}`;
        outputDiv.innerHTML = output;

        this.output.appendChild(commandLine);
        this.output.appendChild(outputDiv);

        // Scroll to bottom
        this.output.parentElement.scrollTop = this.output.parentElement.scrollHeight;
    }

    executeCommand(cmd) {
        if (!cmd) {
            this.addOutput('', '');
            return;
        }

        const [command, ...args] = cmd.toLowerCase().split(' ');

        switch (command) {
            case 'help':
            case 'h':
                this.showHelp();
                break;
            case 'clear':
            case 'cls':
                this.clear();
                break;
            case 'about':
                this.showAbout();
                break;
            case 'projects':
            case 'proj':
                this.showProjects();
                break;
            case 'experience':
            case 'exp':
                this.showExperience();
                break;
            case 'contact':
                this.showContact();
                break;
            case 'education':
            case 'edu':
                this.showEducation();
                break;
            case 'awards':
                this.showAwards();
                break;
            case 'github':
            case 'gh':
                window.open('https://github.com/gstavya', '_blank');
                this.addOutput(cmd, '<span class="success-message">Opening GitHub profile...</span>');
                break;
            case 'linkedin':
            case 'li':
                window.open('https://linkedin.com/in/stavya-gaonkar-0193a7318/', '_blank');
                this.addOutput(cmd, '<span class="success-message">Opening LinkedIn profile...</span>');
                break;
            default:
                this.addOutput(cmd, `<span class="error-message">Command not found: ${command}. Type 'help' to see available commands.</span>`);
        }
    }

    showHelp() {
        const help = `
<span class="command-section">
<h2>Available Commands</h2>
<ul class="help-list">
    <li><span class="help-command">help, h</span><span class="help-description"> - Show this help message</span></li>
    <li><span class="help-command">clear, cls</span><span class="help-description"> - Clear the terminal</span></li>
    <li><span class="help-command">about</span><span class="help-description"> - Show about information</span></li>
    <li><span class="help-command">projects, proj</span><span class="help-description"> - List all projects</span></li>
    <li><span class="help-command">experience, exp</span><span class="help-description"> - Show work experience</span></li>
    <li><span class="help-command">contact</span><span class="help-description"> - Show contact information</span></li>
    <li><span class="help-command">education, edu</span><span class="help-description"> - Show education details</span></li>
    <li><span class="help-command">awards</span><span class="help-description"> - Show awards and achievements</span></li>
    <li><span class="help-command">github, gh</span><span class="help-description"> - Open GitHub profile</span></li>
    <li><span class="help-command">linkedin, li</span><span class="help-description"> - Open LinkedIn profile</span></li>
</ul>
</span>`;
        this.addOutput('help', help);
    }

    clear() {
        this.output.innerHTML = '';
    }

    showAbout() {
        const about = `
<span class="command-section">
<h2>About Me</h2>
<p>I'm Stavya Gaonkar, a freshman at Carnegie Mellon University at the School of Computer Science. I'm excited to learn more about AI everyday and my projects focus on creating intelligent tools that solve real-world problems.</p>
<img src="images/stavya.jpeg" alt="Stavya Gaonkar" />
</span>`;
        this.addOutput('about', about);
    }

    showProjects() {
        // Sort projects: those with images first, then by original order
        const sortedProjects = [...this.data].sort((a, b) => {
            const aHasImage = a.image ? 1 : 0;
            const bHasImage = b.image ? 1 : 0;
            return bHasImage - aHasImage;
        });

        let projects = '<span class="command-section"><h2>Projects</h2><div class="projects-grid">';

        sortedProjects.forEach((project, index) => {
            // Find original index for data reference
            const originalIndex = this.data.indexOf(project);
            let videoLink = '';
            // if (project.video) {
            //     videoLink = ` | <a href="${project.video}" download class="download-link">Demo</a>`;
            // }

            let imageHtml = '';
            if (project.image) {
                imageHtml = `<div class="project-image"><img src="${project.image}" alt="${project.name}" /></div>`;
            }

            projects += `
<div class="project-item" data-project-index="${originalIndex}" style="cursor: pointer;">
    <h3>${project.name}</h3>
    ${imageHtml}
    <p>${project.description}</p>
    <div class="tags">
        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
    <p><a href="${project.link}" target="_blank" onclick="event.stopPropagation()">GitHub</a>${videoLink}</p>
</div>`;
        });

        projects += '</div><div class="project-expanded" id="projectExpanded" style="display: none;"></div></span>';
        this.addOutput('projects', projects);

        // Add click handlers after output is added
        setTimeout(() => {
            document.querySelectorAll('.project-item').forEach((item) => {
                item.addEventListener('click', (e) => {
                    // Don't trigger if clicking on links
                    if (e.target.tagName === 'A' || e.target.closest('a')) {
                        return;
                    }
                    const projectIndex = parseInt(item.getAttribute('data-project-index'));
                    this.expandProject(projectIndex);
                });
            });
        }, 0);
    }

    expandProject(index) {
        const project = this.data[index];
        const expandedDiv = document.getElementById('projectExpanded');

        if (!expandedDiv) return;

        // If clicking the same project, close it
        if (expandedDiv.style.display !== 'none' && expandedDiv.dataset.index == index) {
            expandedDiv.style.display = 'none';
            expandedDiv.innerHTML = '';
            return;
        }

        let videoLink = '';
        // if (project.video) {
        //     videoLink = ` | <a href="${project.video}" download class="download-link">Download Demo</a>`;
        // }

        let imageHtml = '';
        if (project.image) {
            imageHtml = `<div class="project-expanded-image"><img src="${project.image}" alt="${project.name}" /></div>`;
        }

        expandedDiv.innerHTML = `
            <div class="project-expanded-content">
                <div class="project-expanded-header">
                    <h2>${project.name}</h2>
                    <span class="close-expanded">×</span>
                </div>
                ${imageHtml}
                <p class="project-expanded-description">${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <p><a href="${project.link}" target="_blank">View on GitHub →</a>${videoLink}</p>
            </div>
        `;
        expandedDiv.style.display = 'block';
        expandedDiv.dataset.index = index;

        // Add close button handler
        const closeBtn = expandedDiv.querySelector('.close-expanded');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                expandedDiv.style.display = 'none';
                expandedDiv.innerHTML = '';
            });
        }

        // Scroll to expanded view
        expandedDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showExperience() {
        const experience = `
<span class="command-section">
<h2>Experience</h2>

<div class="experience-item">
    <div class="title">Software Engineering Intern</div>
    <div class="meta">Waypoint Transit (YCombinator Winter 2025) | June 2025 – August 2025 | San Francisco, CA</div>
    <ul>
        <li>Developed an AI workflow using OpenAI's Web Search and Code Interpreter APIs to create detailed, fact-checked, and personalized PDFs on the current state of safety in any city, which was used for several demos</li>
        <li>Trained an instance segmentation model from scratch (ResNet-50 + MaskRCNN) on road object data (e.g. sidewalks, roads, curbs)</li>
        <li>Mapped all sidewalks + curbs for Walnut Creek, CA ($20,000 deal)</li>
    </ul>
</div>

<div class="experience-item">
    <div class="title">Software Engineering Intern</div>
    <div class="meta">Alice Care | June 2024 – August 2024 | Sacramento, CA</div>
    <ul>
        <li>Trained a neural network using PyTorch on caregiver data (weather, traffic, past attendance) to predict no-shows</li>
        <li>Achieved a prediction accuracy of 85%, reducing no-shows by 30%</li>
        <li>Used PyTorch, ReactJS, AWS, and Firebase</li>
    </ul>
</div>

<div class="experience-item">
    <div class="title">Artificial Intelligence Intern</div>
    <div class="meta">ServiceWave | February 2024 – June 2024 | San Diego, CA</div>
    <ul>
        <li>Integrated AI into the service app platform to enhance the user experience for non tech-savvy business owners</li>
        <li>Used OpenAI's API, Swift, and Cloud Firestore to create a chatbot, instructional videos, and recommendations</li>
        <li>Increased app usage by 500% in 4 months</li>
    </ul>
</div>
</span>`;
        this.addOutput('experience', experience);
    }

    showContact() {
        const contact = `
<span class="command-section">
<h2>Contact Information</h2>
<ul>
    <li>Phone: <a href="tel:510-509-5930">510-509-5930</a></li>
    <li>Email: <a href="mailto:stavgao@gmail.com">stavgao@gmail.com</a></li>
    <li>LinkedIn: <a href="https://linkedin.com/in/stavya-gaonkar-0193a7318/" target="_blank">linkedin.com/in/stavya-gaonkar-0193a7318/</a></li>
    <li>GitHub: <a href="https://github.com/gstavya" target="_blank">github.com/gstavya</a></li>
</ul>
<p>Quick actions: Type '<span class="help-command">email</span>', '<span class="help-command">github</span>', or '<span class="help-command">linkedin</span>' to open profiles.</p>
</span>`;
        this.addOutput('contact', contact);
    }

    showEducation() {
        const education = `
<span class="command-section">
<h2>Education</h2>

<h3>Bachelor of Science in Computer Science</h3>
<p><strong>Carnegie Mellon University</strong> (In Progress)</p>

<h3>Management and Technology Summer Institute</h3>
<p><strong>University of Pennsylvania</strong> - 4.0 GPA</p>

<h3>High School Diploma</h3>
<p><strong>American High School</strong> - 4.0 GPA</p>
</span>`;
        this.addOutput('education', education);
    }

    showAwards() {
        const awards = `
<span class="command-section">
<h2>Awards & Achievements</h2>
<ul>
    <li>USA Physics Olympiad Bronze Medalist (Top 150 in the nation)</li>
    <li>US National Chemistry Olympiad National Finalist (Top 15 in California Section)</li>
    <li>3x AIME Qualifier (Top 2.5% in the nation)</li>
    <li>4x Hackathon Winner</li>
</ul>
</span>`;
        this.addOutput('awards', awards);
    }

}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
});
