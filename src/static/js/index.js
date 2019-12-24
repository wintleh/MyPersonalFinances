
window.onload = () => {
    
    // Create a header w/ text
    const header = document.createElement('h1');
    const headerText = document.createTextNode('Hello world!');

    // Add text to header, add header to body
    header.appendChild(headerText);
    document.body.appendChild(header);


    // Create paragraph w/ text
    const paragraph = document.createElement('p');
    const pText = document.createTextNode('Some text');
    const altPText = document.createTextNode('Some different text');

    // Add text to paragraph, add paragraph to body
    paragraph.appendChild(pText);
    document.body.appendChild(paragraph);


    // Create button w/ text
    const button = document.createElement('button');
    const buttonText = document.createTextNode('Click');

    // Add text to button, add button to body
    button.appendChild(buttonText);
    document.body.appendChild(button);

    // Button clickeds
    button.addEventListener('click', (event) => {
        
        // Create paragraph w/ text
        const paragraph = document.createElement('p');
        const pText = document.createTextNode('Button Clicked');

        // Add text to paragraph, add paragraph to body
        paragraph.appendChild(pText);
        document.body.appendChild(paragraph);

        setTimeout(() => {
            paragraph.remove();
        }, 1000);
        
    });

    button.addEventListener('mousedown', (event) => {
        console.log(event, header);
        paragraph.replaceChild(altPText, pText);
    });

    button.addEventListener('mouseup', (event) => {
        console.log(event);
        paragraph.replaceChild(pText, altPText);
    });
}