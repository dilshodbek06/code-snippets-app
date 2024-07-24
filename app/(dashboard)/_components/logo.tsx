import { Braces } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Braces className="w-9 h-9 mr-2 text-orange-500 italic" />
      <h4 className="font-semibold text-xl text-gray-600">Snippets</h4>
    </div>
  );
};

export default Logo;
