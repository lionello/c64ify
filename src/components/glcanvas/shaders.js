const frag = `precision mediump float;

uniform sampler2D diffuse;
uniform vec2 resolution;
uniform vec2 offset;
uniform float fxsize;

void main() {

    vec2 blocksize = vec2(fxsize, fxsize/2.0);

    vec2 blocks = resolution / blocksize;

    vec2 uv = ((offset+gl_FragCoord.xy) / resolution);

    vec4 targetColor = texture2D(diffuse, floor((uv.xy*1.0) * blocks) / blocks);

    if(targetColor.a < 1.0){
        gl_FragColor = vec4(0.3215686274509804,0.25882352941176473,0.615686274509804,1);
        return;
    }

    float dif = 1.0;
    vec4 res;

    vec4 p=vec4(0,0,0,1);
    float tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }
    
    p=vec4(0.3215686274509804,0.25882352941176473,0.615686274509804,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }
    
    p=vec4(0.41568627450980394,0.32941176470588235,0,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.596078431372549,0.29411764705882354,0.2627450980392157,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.38823529411764707,0.38823529411764707,0.38823529411764707,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.6078431372549019,0.3176470588235294,0.6470588235294118,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.6078431372549019,0.403921568627451,0.2235294117647059,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.5411764705882353,0.4823529411764706,0.807843137254902,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }


    p=vec4(0.7647058823529411,0.4823529411764706,0.4588235294117647,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.5411764705882353,0.5411764705882353,0.5411764705882353,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.40784313725490196,0.6823529411764706,0.3607843137254902,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.6784313725490196,0.6784313725490196,0.6784313725490196,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.4745098039215686,0.7568627450980392,0.7843137254901961,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.788235294117647,0.8392156862745098,0.5176470588235295,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(0.6392156862745098,0.8980392156862745,0.6,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }

    p=vec4(1,1,1,1);
    tmp= abs(p.r-targetColor.r)*abs(p.r-targetColor.r)+abs(p.b-targetColor.b)*abs(p.b-targetColor.b)+abs(p.g-targetColor.g)*abs(p.g-targetColor.g);

    if(tmp<dif)
    {
        res=p;
        dif=tmp;
    }
    gl_FragColor = res;
;
}`;

const vert = `attribute vec4 position;

void main() {
  gl_Position = position;
}`;

export { vert, frag };
