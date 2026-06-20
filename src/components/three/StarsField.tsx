import { Stars } from '@react-three/drei'

/** Thin wrapper around drei's Stars with sensible defaults for the hero. */
export const StarsField = () => (
  <Stars radius={40} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
)
