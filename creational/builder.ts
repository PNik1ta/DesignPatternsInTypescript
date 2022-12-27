namespace Builder {
    enum ImageFormat {
        PNG = 'png',
        JPEG = 'jpeg'
    }
    
    interface IResolution {
        width: number;
        height: number;
    }
    
    interface IImageConversion extends IResolution {
        format: ImageFormat;
    }
    
    class ImageBuilder {
        private formats: ImageFormat[] = [];
        private resolutions: IResolution[] = [];
    
        addPng(): ImageBuilder {
            if(this.formats.includes(ImageFormat.PNG)) {
                return this;
            }
            this.formats.push(ImageFormat.PNG);
            return this;
        }
    
        addJpeg(): ImageBuilder {
            if(this.formats.includes(ImageFormat.JPEG)) {
                return this;
            }
            this.formats.push(ImageFormat.JPEG);
            return this;
        }
    
        addResolution(width: number, height: number): ImageBuilder {
            this.resolutions.push({ width, height });
            return this;
        }
    
        build(): IImageConversion[] {
            const res: IImageConversion[] = [];
    
            for (const r of this.resolutions) {
                for (const f of this.formats) {
                    res.push({
                        format: f,
                        width: r.width,
                        height: r.height
                    });
                }
            }
            return res;
        }
    }
    
    console.log(new ImageBuilder().addJpeg().addPng().addResolution(100, 50).addResolution(200, 100).build());    
}

