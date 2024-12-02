export const InfoRow = ({ icon: Icon, iconClass, label="",className="" }) => {
  return (
    <>
      <p className="flex gap-2">
        <strong className="flex gap-2 items-center">
          <Icon size={17} className={iconClass} />
        </strong>{" "}
        <span className={className} >
        {label}
        </span>
        
      </p>
    </>
  );
};
