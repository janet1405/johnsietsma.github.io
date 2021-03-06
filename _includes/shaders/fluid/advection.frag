<script type="x-shader/x-fragment" id="advectionFrag">
// Advection

uniform float time;
uniform float timeDelta;
uniform vec2 texelSize;
uniform sampler2D velocityField;

const vec2 ObstaclePos = vec2(0.5,0.5);
const float ObstacleRadius = 0.1;


varying vec2 vUv;


vec2 calcAdvection()
{
    vec2 currVel = texture2D(velocityField,vUv).xy;
    vec2 backPos = vUv - currVel * texelSize * timeDelta;
    return texture2D(velocityField,backPos).xy;
}

vec2 clampBorder( vec2 value )
{
    // Clamp value at borders to zero.
    if( vUv.x>1.0-texelSize.x ||
        vUv.y>1.0-texelSize.y ||
        vUv.x<texelSize.x     ||
        vUv.y<texelSize.y )
    {
        return vec2(0.0, 0.0);
    }
    
    return value;
}

void main()
{
    gl_FragColor = vec4(0.0 ,0.0, 1.0, 1.0);
    vec2 movingObstaclePosition = vec2(ObstaclePos.x, ObstaclePos.y+sin(time*0.2)*0.2);
    if( distance(vUv, movingObstaclePosition) > ObstacleRadius ) {
        vec2 newVel = calcAdvection();
        newVel = clampBorder( newVel );
        gl_FragColor = vec4(newVel, 0.0, 1.0);
    }
}
</script>
