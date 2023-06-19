type CustomHeadingProps = React.ComponentPropsWithRef<
  'em'
>

function CustomItem({
  id,
  children,
  ...otherProps
}: CustomHeadingProps) {

  return (
 
    <span className="border rounded broder-radius-4 px-3 py-2  bg-gray-300 border-gray-500 cursor-not-allowed text-sm disabled:opacity-50 disabled:cursor-not-allowed">
    <svg
        className="inline-block mr-1"                
        viewBox="20 100 1124 1024"
      fill="currentColor"
      height="1em"
      width="1em"
    >
      <path d="M832 464H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v68c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-68c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1156 0z" />
    </svg>
    {children}
    </span>
  );
}

export default CustomItem;