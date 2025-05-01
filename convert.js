const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');

const inputFile = '/Users/grantmdavis/Downloads/Integration API doc V1.docx';
const outputDir = path.join(__dirname, 'content');

// Create content directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create images directory
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Options for conversion
const options = {
  styleMap: [
    "p[style-name='Heading 1'] => h1:fresh",
    "p[style-name='Heading 2'] => h2:fresh",
    "p[style-name='Heading 3'] => h3:fresh",
    "p[style-name='Heading 4'] => h4:fresh"
  ],
  convertImage: mammoth.images.imgElement(function(image) {
    const imageName = `image-${Date.now()}.${image.contentType.split('/')[1]}`;
    const imagePath = path.join(imagesDir, imageName);
    
    // Save the image to the images directory
    fs.writeFileSync(imagePath, image.buffer);
    
    // Return the image element with the path
    return {
      src: `../images/${imageName}`
    };
  })
};

// Convert the Word document to Markdown
mammoth.convertToMarkdown({ path: inputFile }, options)
  .then(result => {
    const markdown = result.value;
    
    // Save the main content
    fs.writeFileSync(path.join(outputDir, 'content.md'), markdown);
    
    console.log('Conversion complete! Check the content directory for your Markdown files.');
    console.log('Warnings:', result.messages);
    
    // Create basic GitBook structure
    createGitBookStructure(markdown);
  })
  .catch(err => {
    console.error('Error converting document:', err);
  });

// Create basic GitBook structure
function createGitBookStructure(content) {
  // Create README.md (GitBook landing page)
  const readmeContent = '# Integration API Documentation\n\nWelcome to the Integration API documentation.\n\n';
  fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent);
  
  // Create SUMMARY.md (GitBook table of contents)
  const summaryContent = `# Summary\n\n* [Introduction](README.md)\n* [API Documentation](content/content.md)\n`;
  fs.writeFileSync(path.join(__dirname, 'SUMMARY.md'), summaryContent);
  
  // Create book.json (GitBook configuration)
  const bookConfig = {
    title: 'Integration API Documentation',
    description: 'Documentation for the Integration API',
    plugins: ['expandable-chapters', 'copy-code-button', 'search']
  };
  fs.writeFileSync(path.join(__dirname, 'book.json'), JSON.stringify(bookConfig, null, 2));
  
  console.log('GitBook structure created!');
}
