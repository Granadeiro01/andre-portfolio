# Background Images Setup Guide

## Quick Setup

Your portfolio is ready for background images. Just add your 4 photos to:

```
/Users/andregranadeiro/andre-portfolio/public/images/
```

### Image Names (Exact)

1. **bg-running.jpg** - Your trail running photo
2. **bg-sailing-1.jpg** - Sailing overview (Thos photo)
3. **bg-sailing-2.jpg** - Sailing race (Laser Seniors)
4. **bg-sailing-3.jpg** - Sailing fleet (multiple boats)

### How It Works

- Images automatically cycle every 10 seconds
- Smooth fade transitions (1 second)
- Desaturated colors (70% saturation) - professional look
- Reduced brightness (85%) - text is readable
- Dark overlay (70% opacity) - ensures content visibility

### File Format

- Format: **JPG** or **PNG** (PNG preferred for better quality)
- Max file size: 2-3 MB each (will be resized by browser)
- Recommended resolution: 1920x1080 or larger
- Aspect ratio: 16:9 works best for full-screen

### Steps

1. Prepare your 4 images
2. Copy them to: `public/images/`
3. Rename to the exact names above
4. Restart dev server: `npm run dev`
5. Visit http://localhost:3000

### Troubleshooting

- Images not showing? Check file names match exactly
- Want to change interval? Edit `VideoBackground.tsx` - change `IMAGE_INTERVAL = 10000` (milliseconds)
- Want to change saturation? Edit `filter: "saturate(0.7)"` (0-1 scale)
- Want to change brightness? Edit `brightness(0.85)` (0-1 scale)

### After Setup

Once images are added:
- Run `npm run build` to verify production build
- Push to GitHub: `git add . && git push`
- Deploy to Vercel - images will be served from CDN

## Need Help?

The component is already built and working. Just add the images and you're done!
