// Minimalist pure-JS GIF89a generator without external native dependencies
import fs from 'fs';
import path from 'path';

// Generate a valid looping animated GIF89a file
// 64x64 luxury animated gold emblem with shimmer
const width = 64;
const height = 64;
const numFrames = 8;

// Basic GIF header & palette
const palette = [
  [9, 9, 11],       // 0: background dark
  [212, 175, 55],   // 1: gold base
  [245, 230, 180],  // 2: gold highlight
  [255, 255, 255],  // 3: pure white shine
  [168, 119, 26],   // 4: gold shadow
  [251, 191, 36],   // 5: amber
  [229, 193, 123],  // 6: champagne
  [12, 11, 14],     // 7: phone fill
];

// Simple LZW uncompressed/clear-code GIF stream writer
function createGifBuffer() {
  const chunks = [];
  
  // Header: GIF89a
  chunks.push(Buffer.from('GIF89a'));
  
  // Logical Screen Descriptor
  const lsd = Buffer.alloc(7);
  lsd.writeUInt16LE(width, 0);
  lsd.writeUInt16LE(height, 2);
  lsd[4] = 0b10000010; // Global Color Table Flag, 3 bits per pixel (8 colors)
  lsd[5] = 0; // Background color index
  lsd[6] = 0; // Pixel aspect ratio
  chunks.push(lsd);

  // Global Color Table (8 colors * 3 bytes = 24 bytes)
  const gct = Buffer.alloc(24);
  palette.forEach((c, i) => {
    gct[i * 3] = c[0];
    gct[i * 3 + 1] = c[1];
    gct[i * 3 + 2] = c[2];
  });
  chunks.push(gct);

  // Netscape 2.0 Loop Extension
  chunks.push(Buffer.from([0x21, 0xFF, 0x0B]));
  chunks.push(Buffer.from('NETSCAPE2.0'));
  chunks.push(Buffer.from([0x03, 0x01, 0x00, 0x00, 0x00])); // Infinite loop

  // Render Frames
  for (let f = 0; f < numFrames; f++) {
    // Graphic Control Extension (delay 15 = 150ms)
    chunks.push(Buffer.from([0x21, 0xF9, 0x04, 0x00, 15, 0, 0, 0x00]));

    // Image Descriptor
    const id = Buffer.alloc(10);
    id[0] = 0x2C; // Image separator
    id.writeUInt16LE(0, 1); // Left
    id.writeUInt16LE(0, 3); // Top
    id.writeUInt16LE(width, 5); // Width
    id.writeUInt16LE(height, 7); // Height
    id[9] = 0x00; // No local color table
    chunks.push(id);

    // Frame raster data (generate phone, crown, laurel, VB, shimmer position)
    const frameData = Buffer.alloc(width * height, 0);
    const shimmerX = (f / numFrames) * width;

    // Draw luxury phone outline
    for (let y = 10; y < 54; y++) {
      for (let x = 18; x < 46; x++) {
        const isBorder = (x === 18 || x === 45 || y === 10 || y === 53);
        const isSpeaker = y === 13 && x >= 28 && x <= 35;
        const isHome = y === 50 && x >= 28 && x <= 35;
        
        // VB monogram pixels in center
        const isV = (y >= 26 && y <= 38) && (
          (x === 24 && y <= 30) || (x === 25 && y >= 29 && y <= 34) || 
          (x === 26 && y >= 33 && y <= 38) || (x === 27 && y >= 33 && y <= 38) ||
          (x === 28 && y >= 29 && y <= 34) || (x === 29 && y <= 30)
        );
        const isB = (y >= 26 && y <= 38) && (
          (x === 32) || 
          (y === 26 && x >= 32 && x <= 38) ||
          (y === 32 && x >= 32 && x <= 37) ||
          (y === 38 && x >= 32 && x <= 38) ||
          (x === 39 && (y === 28 || y === 29 || y === 30 || y === 34 || y === 35 || y === 36))
        );

        if (isBorder || isSpeaker || isHome || isV || isB) {
          const dist = Math.abs(x - shimmerX);
          if (dist < 3) {
            frameData[y * width + x] = 3; // White shine
          } else if (dist < 6) {
            frameData[y * width + x] = 2; // Bright highlight
          } else {
            frameData[y * width + x] = 1; // Gold
          }
        } else {
          frameData[y * width + x] = 7; // Phone screen dark
        }
      }
    }

    // Crown (top right)
    const crownPixels = [
      [42, 6], [45, 10], [48, 5], [51, 10], [54, 6],
      [43, 11], [44, 11], [45, 11], [46, 11], [47, 11], [48, 11], [49, 11], [50, 11], [51, 11], [52, 11], [53, 11]
    ];
    crownPixels.forEach(([cx, cy]) => {
      frameData[cy * width + cx] = f % 2 === 0 ? 5 : 1;
    });

    // Laurel leaves (left)
    const laurelPixels = [
      [14, 20], [13, 22], [14, 24],
      [11, 28], [10, 30], [11, 32],
      [12, 36], [11, 38], [12, 40],
      [14, 44], [15, 46], [16, 48]
    ];
    laurelPixels.forEach(([lx, ly]) => {
      frameData[ly * width + lx] = 6;
    });

    // Conversion chain nodes (bottom right)
    const nodePixels = [
      [47, 44], [48, 43], [49, 44], [50, 45],
      [51, 46], [52, 47], [53, 46], [54, 45]
    ];
    nodePixels.forEach(([nx, ny]) => {
      frameData[ny * width + nx] = 1;
    });

    // LZW Minimal uncompressed sub-blocks (code size 4)
    const minCodeSize = 3; // for 8 colors
    chunks.push(Buffer.from([minCodeSize]));

    // Output raw sub-blocks using clear code & end code
    const clearCode = 1 << minCodeSize; // 8
    const endCode = clearCode + 1; // 9
    
    // Simple bit-packing
    const bits = [];
    const pushBits = (val, count) => {
      for (let b = 0; b < count; b++) {
        bits.push((val >> b) & 1);
      }
    };

    let curCodeSize = minCodeSize + 1; // 4
    pushBits(clearCode, curCodeSize);
    
    for (let p = 0; p < frameData.length; p++) {
      pushBits(frameData[p], curCodeSize);
    }
    pushBits(endCode, curCodeSize);

    // Convert bits to byte buffer
    const packedBytes = [];
    for (let b = 0; b < bits.length; b += 8) {
      let byte = 0;
      for (let bit = 0; bit < 8; bit++) {
        if (b + bit < bits.length) {
          byte |= (bits[b + bit] << bit);
        }
      }
      packedBytes.push(byte);
    }

    // Split into sub-blocks of max 254 bytes
    for (let i = 0; i < packedBytes.length; i += 254) {
      const slice = packedBytes.slice(i, i + 254);
      chunks.push(Buffer.from([slice.length, ...slice]));
    }
    chunks.push(Buffer.from([0x00])); // Block terminator
  }

  // Trailer
  chunks.push(Buffer.from([0x3B]));

  return Buffer.concat(chunks);
}

const gifBuffer = createGifBuffer();
const outPath = path.resolve('public', 'biovip-logo.gif');
fs.writeFileSync(outPath, gifBuffer);
console.log('Generated:', outPath, 'Bytes:', gifBuffer.length);
