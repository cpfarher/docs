
/**
 * markdown to html conversion
 * 
 * @param {*} markdown 
 */
function markDownToHtml(markdown) {
    const firstSpaceIndex = markdown.indexOf('# ');
    const firstTextPart = markdown.substring(
      firstSpaceIndex + 2,
      markdown.length
    );
    const markDownSymbol = markdown.substring(0, firstSpaceIndex + 1);
    const secondIndex = firstTextPart.indexOf(' #');
    const text = firstTextPart.substring(secondIndex, -1);
    const translateDict = { '#': 'h1', '##': 'h2', '###': 'h3' };
    const markDownTag = translateDict[markDownSymbol];
    console.log(`<${markDownTag}>${text}</${markDownTag}>`);
  }

  markDownToHtml('# hello #');
  markDownToHtml('## hello ads f ##');
  markDownToHtml('### hello ###');