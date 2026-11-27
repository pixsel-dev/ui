import type {CSSProperties} from 'react';

/** The button owns one accessible label. These duplicate glyphs are visual only. */
export function RollingLabel({text}:{text:string}){
  return <span className="rolling-label" aria-hidden="true">{[...text].map((char,index)=><span className="roll-char" key={index} style={{'--roll-delay':`${index*12}ms`} as CSSProperties}><span className="roll-glyph">{char===' '?'\u00a0':char}</span><span className="roll-glyph">{char===' '?'\u00a0':char}</span></span>)}</span>;
}
