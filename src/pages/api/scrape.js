const fs = require('fs');
const blocksToText = require('./blocksToText');

const loadNew = ( pageNumber, callback ) => {
  
  fetch('https://www.futurepedia.io/api/tools?page=' + pageNumber + '&sort=verified')
    .then(response => response.json())
    .then(data => {
      // Extract data from the response using JavaScript array methods like forEach, map, filter etc.
      const responseObject = data;

      // Iterate through all objects in the API response array
      responseObject.forEach((item, index) => {
        // Convert the rich text description to plain text using the blocksToText function
        const toolRichTextDescription = blocksToText(item.toolRichTextDescription);
        const slug = blocksToText(item.slug);

        const toolCategories = blocksToText(item.toolCategories);
        const categoryDescription = blocksToText(item.toolCategories[0].categoryDescription);
        const categoryName = blocksToText(item.toolCategories[0].categoryName);
        const mainImageRef = blocksToText(item.mainImage.asset._ref);
        
        // Extract the file type
        const fileType = mainImageRef.split("-").pop().split(".").pop();
        
        // Extract the desired portion and modify the format
        const splitRef = mainImageRef.split("-");
        const filename = `${splitRef[1]}-${splitRef[2]}.${fileType}`;
        const imageUrl = `https://cdn.sanity.io/images/u0v1th4q/production/${filename}`;

        let socialLinks = '';
        if (Array.isArray(item.socialLinks) && item.socialLinks.length > 0) {
          socialLinks = `socialLinks:\n${item.socialLinks.join('\n')}`;
        }

        // Create the .mdx content using template literals
        const mdxContent = `
        ---
        id: ${item.id}
        toolName: ${item.toolName}
        toolRichTextDescription: ${toolRichTextDescription}
        toolShortDescription: ${item.toolShortDescription}
        pricing: ${item.pricing}
        slug: ${slug}
        newFeatures: ${item.newFeatures}
        tagsIndex: ${item.tagsIndex}
        mainImages: ${imageUrl}
        toolCategories: ${toolCategories}
        categoryName: ${categoryName}
        categoryDescription: ${categoryDescription}
        favCount: ${item.favCount}
        featured: ${item.featured}
        startingPrice: ${item.startingPrice}
        pricing: ${item.pricing}
        verified: ${item.verified}
        ${socialLinks}
        
        youtubeUrl: ${item.youtubeUrl}	
        ---

        ${item.toolName}
        - **Short Description:** ${item.toolShortDescription}
        - **Website URL:** [${item.websiteUrl.split('?')[0]}](${item.websiteUrl.split('?')[0]})
        `;

      });
    })
    .catch(error => console.error(error)); // Catch any errors thrown during the fetch request or parsing of
}