const fs = require('fs');
const path = require('path');

// Read the converted markdown file
const contentPath = path.join(__dirname, 'content', 'content.md');
const outputDir = path.join(__dirname, 'docs');

// Create docs directory for cleaned files
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read the content file
let content = fs.readFileSync(contentPath, 'utf8');

// Clean up the content
function cleanMarkdown(content) {
  // Remove HTML anchors
  content = content.replace(/<a id="[^"]*"><\/a>/g, '');
  
  // Unescape periods and other characters
  content = content.replace(/\\([.!])/g, '$1');
  
  // Fix markdown headings (sometimes # gets escaped)
  content = content.replace(/\\#/g, '#');
  
  // Remove escaped slashes
  content = content.replace(/\\\//g, '/');
  
  // Fix hyperlinks
  content = content.replace(/<Hyperlink>/g, '');
  
  return content;
}

// Clean the content
const cleanedContent = cleanMarkdown(content);

// Write the cleaned content
fs.writeFileSync(path.join(outputDir, 'README.md'), cleanedContent);

// Create sections based on headings
function createSections(content) {
  // Split by level 1 headings
  const sections = content.split(/^# /m).filter(Boolean);
  const sectionFiles = [];
  
  sections.forEach((section, index) => {
    // Get the section title from the first line
    const titleMatch = section.match(/^(.+?)$/m);
    const title = titleMatch ? titleMatch[1].trim() : `Section ${index + 1}`;
    
    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Add the heading back
    const sectionContent = `# ${section}`;
    
    // Write the section to a file
    const filename = `${slug}.md`;
    fs.writeFileSync(path.join(outputDir, filename), sectionContent);
    
    sectionFiles.push({
      title,
      filename
    });
  });
  
  return sectionFiles;
}

// Split content into sections
const sections = createSections(cleanedContent);

// Create summary file
let summary = '# Summary\n\n';
summary += '* [Introduction](README.md)\n';
sections.forEach(section => {
  summary += `* [${section.title}](${section.filename})\n`;
});

fs.writeFileSync(path.join(outputDir, 'SUMMARY.md'), summary);

console.log('Documentation cleaned and organized into sections!');
console.log('Files created:');
console.log(`- ${path.join(outputDir, 'README.md')}`);
console.log(`- ${path.join(outputDir, 'SUMMARY.md')}`);
sections.forEach(section => {
  console.log(`- ${path.join(outputDir, section.filename)}`);
});
