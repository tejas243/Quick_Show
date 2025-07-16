const BlurCircle = ({ top = "auto", left = "auto", right = "auto", bottom = "auto" }) => {
  return (
    <div
      className="absolute -z-50 w-58 aspect-square rounded-full bg-primary/30 blur-3xl"
      style={{ top, left, right, bottom, height: "14.5rem" }} 
    >
    </div>
  )
}

export default BlurCircle