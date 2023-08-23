const frag = /* cpp */`precision mediump float;

uniform sampler2D diffuse;
uniform vec2 resolution;
uniform vec2 offset;
uniform float fxsize;

#define LENSQR(d) dot((d), (d))

// from https://www.shadertoy.com/view/MtjGRd
uniform sampler2D iChannel0;
uniform vec2 iChannelResolution0;
#define DITHER
#define PALETTE_SIZE 16

#define RGB(r,g,b) (vec4(r,g,b,255) / 255.0)
vec4 palette[PALETTE_SIZE];

//Initalizes the color palette.
void InitPalette()
{
    //16-Color C64 color palette.
    palette[ 0] = RGB(  0,  0,  0);
    palette[ 1] = RGB(255,255,255);
    palette[ 2] = RGB(152, 75, 67);
    palette[ 3] = RGB(121,193,200);
    palette[ 4] = RGB(155, 81,165);
    palette[ 5] = RGB(104,174, 92);
    palette[ 6] = RGB( 62, 49,162);
    palette[ 7] = RGB(201,214,132);
    palette[ 8] = RGB(155,103, 57);
    palette[ 9] = RGB(106, 84,  0);
    palette[10] = RGB(195,123,117);
    palette[11] = RGB( 85, 85, 85);
    palette[12] = RGB(138,138,138);
    palette[13] = RGB(163,229,153);
    palette[14] = RGB(138,123,206);
    palette[15] = RGB(173,173,173);
}

//Blends the nearest two palette colors with dithering.
vec4 GetDitheredPalette(vec4 c, vec4 c1, vec4 c2, vec2 pixel)
{
    vec4 diff = c2 - c1;
    float idx = dot(diff, c - c1) / dot(diff, diff);

    float dith = 0.5;
#ifdef DITHER
    dith = texture2D(iChannel0, pixel / iChannelResolution0.xy).r;
#endif

    float mixAmt = float(fract(idx) > dith);
	return mix(c1,c2,mixAmt);
}

void FindClosestPaletteColors(vec4 targetColor, out vec4 res, out vec4 res2) {
    float dif = 3.0, dif2 = 3.0;

    vec4 p=palette[0];
    float tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }

    p=palette[1];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[2];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[3];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[4];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[5];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[6];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[7];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }



    p=palette[8];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[9];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[10];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[11];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[12];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[13];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[14];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }


    p=palette[15];
    tmp= LENSQR(p - targetColor);

    if(tmp<dif) {
        dif2 = dif;
        res2 = res;
        res=p;
        dif=tmp;
    } else if (tmp < dif2) {
        dif2 = tmp;
        res2 = p;
    }
}

void main() {

    float hfxsize = fxsize/2.0;
    vec2 blocksize = vec2(fxsize, hfxsize);

    vec2 blocks = resolution / blocksize;

    vec2 uv = ((offset+gl_FragCoord.xy) / resolution);

    vec4 targetColor = texture2D(diffuse, floor((uv.xy) * blocks) / blocks);

    InitPalette();

    if(targetColor.a < 1.0){
        gl_FragColor = palette[6];
        return;
    }

    vec4 res, res2;
    FindClosestPaletteColors(targetColor, res, res2);

    gl_FragColor = GetDitheredPalette(targetColor, res, res2, gl_FragCoord.xy/hfxsize);
}`;

const vert = /* cpp */`attribute vec4 position;

void main() {
  gl_Position = position;
}`;

export { vert, frag };
