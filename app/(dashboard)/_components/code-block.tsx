import { dracula, CopyBlock, nord } from "react-code-blocks";

const MyCodeBlock = () => {
  const code = ` const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [mounted, setMounted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mounted, setMounted] = useState(false);
  `;

  const language = "javascript";
  return (
    <div className="mt-2 line-clamp-[10]">
      <CopyBlock
        language={language}
        text={code}
        wrapLongLines
        theme={nord}
        customStyle={{}}
        codeBlockStyle={{}}
      />
    </div>
  );
};

export default MyCodeBlock;
