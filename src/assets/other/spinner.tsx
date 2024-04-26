const LoadingAnimation = ({className}:{
  className?:string
}) => {
    return (
      <div className="loading-container">
        <div className={`spinner ${className}`}></div>
      </div>
    );
  };
  
  export default LoadingAnimation;