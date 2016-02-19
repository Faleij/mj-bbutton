import './bbutton'
import mjml from 'mjml'

/*
  Compile an mjml string
*/
const htmlOutput = mjml.mjml2html(`<mj-body>
  <mj-section>
    <mj-column>
      <mj-bbutton
        background-image-url="https://i.imgur.com/0xPEf.gif"
        background-color="#556270"
        font-color="#ffffff"
        width="200px"
        height="40px"
        border-color="#1e3650"
        border-radius="4px">My Button
      </mj-bbutton>
    </mj-column>
  </mj-section>
</mj-body>
`)

/*
  Print the responsive HTML generated
*/
console.log(htmlOutput);
