import './App.css';
import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import InputColor from 'react-input-color';

function App() {
  const [dots, cngDots] = useState("squares");
  const [value, cngValue] = useState("https://github.com/M4ddCat");
  const [bgColor, cngBg] = useState("#FFFFFF");
  const [fgColor, cngFg] = useState("#000000");
  const [eyeColor, cngEye] = useState("#000000");
  const [frameEye, cngFrame] = useState("#000000");
  const [logoImage, cngLogo] = useState("");
  const [logoWidth, cngLWidth] = useState(300);
  const [logoOpacy, cngLOpacy] = useState(1);
  const [removeQrCodeBehindLogo, rmQRBL] = useState(false);
  const [eyeRadius, cngERad] = useState({ outer: 0, inner: 0 });
  return (
    <div className="App">

      <div className="Generator">
        <h2>Custom QR Code Generator</h2>
        <div className="SettingsQR">
          <input
            className="InputText"
            type="text"
            value={value}
            onChange={event => cngValue(event.target.value)}></input>
          <br />
          <table>
            <tr>
              <td colSpan="2">
                <span className='SettingsHeader'>
                  QR settings
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="SettingsText">
                  "Eye" radius
                </span>
              </td>
              <td className="SettingsElement">
                <input type="range" min="0" max="50" id='inner' defaultValue={0} 
                onChange={event => cngERad({ inner: event.target.value, outer: eyeRadius.outer })} />
              </td>
            </tr>
            <tr>
              <td>
                <span className="SettingsText">
                  "Eye" frame radius
                </span>
              </td>
              <td className="SettingsElement">
                <input type="range" min="0" max="140" id='outer' defaultValue={0}
                    onChange={event => cngERad({ inner: eyeRadius.inner, outer: event.target.value })} />
              </td>
            </tr>
            <tr>
              <td>
                <span className="SettingsText">
                  Dots instead of squares
                </span>
              </td>
              <td className="SettingsElement">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={event => cngDots(event.target.checked === false ? "squares" : "dots")}
                  />
                  <span className="slider round"></span>
                </label>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <span className='SettingsHeader'>
                  Color settings
                </span>
              </td>

            </tr>
            <tr>
            <td>
                <span className="SettingsText">
                  Select basic color
                </span>
              </td>
              <td className="SettingsElement">
                <InputColor
                  initialValue="#000000"
                  onChange={cngFg}
                  placement="left"
                />
              </td>
              
            </tr>
            <tr>
            <td>
                <span className="SettingsText">
                  Select background color
                </span>
              </td>
              <td className="SettingsElement">
                <InputColor
                  initialValue="#fff"
                  onChange={cngBg}
                  placement="left"
                />
              </td>
              
            </tr>
            <tr>
            <td>
                <span className="SettingsText">
                  Select "eye" color
                </span>
              </td>
              <td className="SettingsElement">
                <InputColor
                  initialValue="#000000"
                  onChange={cngEye}
                  placement="left"
                />
              </td>
              
            </tr>
            <tr>
            <td>
                <span className="SettingsText">
                  Select "eye" frame color
                </span>
              </td>
              <td className="SettingsElement">
                <InputColor
                  initialValue="#000000"
                  onChange={cngFrame}
                  placement="left"
                />
              </td>
              
            </tr>

            <tr>
              <td colSpan="2">
                <span className='SettingsHeader'>
                  Logotype settings
                </span>
              </td>

            </tr>
            <tr>
            <td>
                <span className="SettingsText">
                  Load your logotype
                </span>
              </td>
              <td className='imgUpload SettingsElement'>
                <label className='iconUpload' >
                  <i class="material-icons">upload</i>
                  <input type="file" id="Logo"
                    accept=".jpg, .jpeg, .png"

                    onChange={event => convertBase64(event.target.files[0])}></input>
                </label>

              </td>
              
            </tr>
            <tr>
            <td>
                <span className="SettingsText">
                  Remove QR behind logo
                </span>
              </td>
              <td className="SettingsElement">
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={event => rmQRBL(event.target.checked)}
                  />
                  <span className="slider round" ></span>
                </label>
              </td>
              
            </tr>
            <tr>
              <td>
                <span className="SettingsText">
                  Logotype size
                </span>
              </td>
              <td className="SettingsElement">
              <input type="range" min="1" max="100" defaultValue={20} onChange={event => cngLWidth(event.target.value * 0.01 * 1500)} />

              </td>
            </tr>
            <tr>
              <td>
                <span className="SettingsText">
                  Logotype opacy
                </span>
              </td>
              <td className="SettingsElement">
                <input type="range" min="0" max="100" defaultValue={100} onChange={event => cngLOpacy(event.target.value * 0.01)} />

              </td>
            </tr>
          </table>
          <div>
          </div>
        </div>
        <div className="QRField" id='QRField'>
          <QRCode value={value} bgColor={bgColor.hex} fgColor={fgColor.hex}
            eyeColor={{ outer: frameEye.hex, inner: eyeColor.hex }} size={1500} logoImage={logoImage}
            logoWidth={logoWidth} logoHeight={logoWidth} logoOpacity={logoOpacy}
            removeQrCodeBehindLogo={removeQrCodeBehindLogo} qrStyle={dots} id={"QRCode"}
            eyeRadius={[eyeRadius, eyeRadius, eyeRadius]} ecLevel={"H"} />
          <br />
          <button className='DownloadButton' onClick={download}>Download</button>
        </div>
      </div>
    </div>
  );

  function convertBase64(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cngLogo(reader.result);
    };
  };

  function download(){
    var canvas = document.querySelector('#QRCode');
    var image = canvas.toDataURL();  
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'qrcode.png';
    tmpLink.href = image;  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink ); 
  }

}

export default App;
