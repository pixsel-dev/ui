import type {CSSProperties} from 'react';
import {RollingLabel} from './rolling-label';

/** A persistent entrance keeps the final paint state while hover rolls separately. */
export function NavbarLabel({text,index}:{text:string;index:number}){
  return <span className="navbar-label" aria-hidden="true" style={{'--label-delay':`${430+index*65}ms`} as CSSProperties}><RollingLabel text={text}/></span>;
}
