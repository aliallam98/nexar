import React, { forwardRef, useImperativeHandle } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";

import {
  Paper,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  Divider,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  IconButton,
  Tooltip,
  Stack,
  Grid,
  useTheme,
} from "@mui/material";

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  StrikethroughS,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Code,
  Link as LinkIcon,
  TableChart,
  Undo,
  Redo,
  ExpandMore,
} from "@mui/icons-material";

// Material-UI styled Tiptap Editor Component
const MUITiptapEditor = forwardRef(
  (
    {
      value = "",
      onChange,
      height = "400px",
      error = false,
      helperText = "",
    }: any,
    ref
  ) => {
    const theme = useTheme();

    const editor = useEditor({
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Link.configure({
          openOnClick: false,
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        TextStyle,
        Color,
        Underline,
      ],
      content: value,
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        onChange?.(html);
      },
    });

    useImperativeHandle(ref, () => ({
      focus: () => editor?.chain().focus().run(),
      getHTML: () => editor?.getHTML() || "",
      getText: () => editor?.getText() || "",
      clear: () => editor?.chain().clearContent().run(),
      setContent: (content) => editor?.commands.setContent(content),
    }));

    React.useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value);
      }
    }, [editor, value]);

    if (!editor) {
      return (
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <CircularProgress />
        </Paper>
      );
    }

    const handleToolbarAction = (action) => {
      switch (action) {
        case "bold":
          editor.chain().focus().toggleBold().run();
          break;
        case "italic":
          editor.chain().focus().toggleItalic().run();
          break;
        case "underline":
          editor.chain().focus().toggleUnderline().run();
          break;
        case "strike":
          editor.chain().focus().toggleStrike().run();
          break;
        case "bulletList":
          editor.chain().focus().toggleBulletList().run();
          break;
        case "orderedList":
          editor.chain().focus().toggleOrderedList().run();
          break;
        case "blockquote":
          editor.chain().focus().toggleBlockquote().run();
          break;
        case "alignLeft":
          editor.chain().focus().setTextAlign("left").run();
          break;
        case "alignCenter":
          editor.chain().focus().setTextAlign("center").run();
          break;
        case "alignRight":
          editor.chain().focus().setTextAlign("right").run();
          break;
        case "code":
          editor.chain().focus().toggleCode().run();
          break;
        case "codeBlock":
          editor.chain().focus().toggleCodeBlock().run();
          break;
        case "link":
          const url = window.prompt("Enter URL:");
          if (url) {
            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }
          break;
        case "table":
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
          break;
        case "undo":
          editor.chain().focus().undo().run();
          break;
        case "redo":
          editor.chain().focus().redo().run();
          break;
      }
    };

    const handleHeadingChange = (event) => {
      const level = event.target.value;
      if (level === "paragraph") {
        editor.chain().focus().setParagraph().run();
      } else {
        editor
          .chain()
          .focus()
          .toggleHeading({ level: parseInt(level) })
          .run();
      }
    };

    const getCurrentHeading = () => {
      if (editor.isActive("heading", { level: 1 })) return "1";
      if (editor.isActive("heading", { level: 2 })) return "2";
      if (editor.isActive("heading", { level: 3 })) return "3";
      return "paragraph";
    };

    return (
      <Paper
        variant="outlined"
        sx={{
          borderColor: error ? "error.main" : "divider",
          borderRadius: 2,
          overflow: "hidden",
          "&:focus-within": {
            borderColor: "primary.main",
            borderWidth: 2,
          },
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            p: 2,
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.nestedPaper"
                : "grey.50",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            alignItems="center"
          >
            {/* Text Formatting */}
            <ButtonGroup size="small" variant="outlined">
              <Tooltip title="Bold">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("bold")}
                  color={editor.isActive("bold") ? "primary" : "default"}
                >
                  <FormatBold />
                </IconButton>
              </Tooltip>
              <Tooltip title="Italic">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("italic")}
                  color={editor.isActive("italic") ? "primary" : "default"}
                >
                  <FormatItalic />
                </IconButton>
              </Tooltip>
              <Tooltip title="Underline">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("underline")}
                  color={editor.isActive("underline") ? "primary" : "default"}
                >
                  <FormatUnderlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Strikethrough">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("strike")}
                  color={editor.isActive("strike") ? "primary" : "default"}
                >
                  <StrikethroughS />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Divider orientation="vertical" flexItem />

            {/* Heading Selector */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={getCurrentHeading()}
                onChange={handleHeadingChange}
                displayEmpty
                size="small"
              >
                <MenuItem value="paragraph">Paragraph</MenuItem>
                <MenuItem value="1">Heading 1</MenuItem>
                <MenuItem value="2">Heading 2</MenuItem>
                <MenuItem value="3">Heading 3</MenuItem>
              </Select>
            </FormControl>

            <Divider orientation="vertical" flexItem />

            {/* Lists and Quote */}
            <ButtonGroup size="small" variant="outlined">
              <Tooltip title="Bullet List">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("bulletList")}
                  color={editor.isActive("bulletList") ? "primary" : "default"}
                >
                  <FormatListBulleted />
                </IconButton>
              </Tooltip>
              <Tooltip title="Numbered List">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("orderedList")}
                  color={editor.isActive("orderedList") ? "primary" : "default"}
                >
                  <FormatListNumbered />
                </IconButton>
              </Tooltip>
              <Tooltip title="Quote">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("blockquote")}
                  color={editor.isActive("blockquote") ? "primary" : "default"}
                >
                  <FormatQuote />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Divider orientation="vertical" flexItem />

            {/* Alignment */}
            <ButtonGroup size="small" variant="outlined">
              <Tooltip title="Align Left">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("alignLeft")}
                  color={
                    editor.isActive({ textAlign: "left" })
                      ? "primary"
                      : "default"
                  }
                >
                  <FormatAlignLeft />
                </IconButton>
              </Tooltip>
              <Tooltip title="Align Center">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("alignCenter")}
                  color={
                    editor.isActive({ textAlign: "center" })
                      ? "primary"
                      : "default"
                  }
                >
                  <FormatAlignCenter />
                </IconButton>
              </Tooltip>
              <Tooltip title="Align Right">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("alignRight")}
                  color={
                    editor.isActive({ textAlign: "right" })
                      ? "primary"
                      : "default"
                  }
                >
                  <FormatAlignRight />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Divider orientation="vertical" flexItem />

            {/* Code and Links */}
            <ButtonGroup size="small" variant="outlined">
              <Tooltip title="Code">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("code")}
                  color={editor.isActive("code") ? "primary" : "default"}
                >
                  <Code />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Link">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("link")}
                >
                  <LinkIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Insert Table">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("table")}
                >
                  <TableChart />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Divider orientation="vertical" flexItem />

            {/* Undo/Redo */}
            <ButtonGroup size="small" variant="outlined">
              <Tooltip title="Undo">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("undo")}
                >
                  <Undo />
                </IconButton>
              </Tooltip>
              <Tooltip title="Redo">
                <IconButton
                  size="small"
                  onClick={() => handleToolbarAction("redo")}
                >
                  <Redo />
                </IconButton>
              </Tooltip>
            </ButtonGroup>
          </Stack>
        </Box>

        {/* Editor Content */}
        <Box sx={{ minHeight: height, position: "relative" }}>
          <EditorContent editor={editor} />
        </Box>

        {helperText && (
          <FormHelperText error={error} sx={{ px: 2, pb: 1 }}>
            {helperText}
          </FormHelperText>
        )}

        <style jsx global>{`
          .ProseMirror {
            outline: none;
            font-size: 16px;
            line-height: 1.6;
            color: ${theme.palette.text.primary};
            background-color: ${theme.palette.background.paper};
            padding: 24px;
            min-height: ${height};
            font-family: ${theme.typography.fontFamily};
            border: none;
          }

          .ProseMirror h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin: 1.5rem 0;
            background: linear-gradient(
              135deg,
              ${theme.palette.primary.main} 0%,
              ${theme.palette.secondary.main} 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.2;
          }

          .ProseMirror h2 {
            font-size: 2rem;
            font-weight: 700;
            margin: 1.25rem 0;
            color: ${theme.palette.primary.main};
            line-height: 1.3;
          }

          .ProseMirror h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1rem 0;
            color: ${theme.palette.primary.main};
            line-height: 1.4;
          }

          .ProseMirror p {
            margin: 0.75rem 0;
            color: ${theme.palette.text.primary};
          }

          .ProseMirror ul,
          .ProseMirror ol {
            padding-left: 1.5rem;
            margin: 1rem 0;
          }

          .ProseMirror li {
            margin: 0.3rem 0;
            color: ${theme.palette.text.primary};
          }

          .ProseMirror blockquote {
            border-left: 4px solid ${theme.palette.primary.main};
            padding-left: 20px;
            margin: 1.5rem 0;
            font-style: italic;
            color: ${theme.palette.text.secondary};
            background: ${theme.palette.mode === "dark"
              ? "rgba(100, 108, 255, 0.1)"
              : "rgba(100, 108, 255, 0.04)"};
            padding: 20px;
            border-radius: 0 12px 12px 0;
            position: relative;
          }

          .ProseMirror blockquote::before {
            content: '"';
            font-size: 4rem;
            color: ${theme.palette.primary.main};
            position: absolute;
            left: 8px;
            top: -10px;
            opacity: 0.3;
          }

          .ProseMirror code {
            background: ${theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.08)"};
            color: ${theme.palette.primary.main};
            padding: 4px 8px;
            border-radius: 6px;
            font-family: "Monaco", "Menlo", "Consolas", monospace;
            font-size: 0.875rem;
            font-weight: 500;
          }

          .ProseMirror pre {
            background: ${theme.palette.mode === "dark"
              ? "#1e1e1e"
              : "#f8f9fa"};
            color: ${theme.palette.text.primary};
            padding: 20px;
            border-radius: 12px;
            overflow-x: auto;
            margin: 1.5rem 0;
            font-family: "Monaco", "Menlo", "Consolas", monospace;
            border: 1px solid ${theme.palette.divider};
            position: relative;
          }

          .ProseMirror pre code {
            background: none;
            color: inherit;
            padding: 0;
            border-radius: 0;
          }

          .ProseMirror a {
            color: ${theme.palette.primary.main};
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s ease;
          }

          .ProseMirror a:hover {
            text-decoration: underline;
            color: ${theme.palette.primary.dark};
          }

          .ProseMirror table {
            border-collapse: collapse;
            width: 100%;
            margin: 1.5rem 0;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border: 1px solid ${theme.palette.divider};
          }

          .ProseMirror th,
          .ProseMirror td {
            border: 1px solid ${theme.palette.divider};
            padding: 12px 16px;
            text-align: left;
            position: relative;
          }

          .ProseMirror th {
            background: ${theme.palette.mode === "dark"
              ? "rgba(100, 108, 255, 0.1)"
              : "rgba(100, 108, 255, 0.05)"};
            font-weight: 600;
            color: ${theme.palette.text.primary};
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .ProseMirror tr:nth-child(even) td {
            background: ${theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.02)"
              : "rgba(0, 0, 0, 0.02)"};
          }

          .ProseMirror tr:hover td {
            background: ${theme.palette.mode === "dark"
              ? "rgba(100, 108, 255, 0.05)"
              : "rgba(100, 108, 255, 0.03)"};
          }

          .ProseMirror p.is-editor-empty:first-child::before {
            content: attr(data-placeholder);
            float: left;
            color: ${theme.palette.text.disabled};
            pointer-events: none;
            height: 0;
            font-style: italic;
          }

          .ProseMirror strong {
            color: ${theme.palette.text.primary};
            font-weight: 700;
          }

          .ProseMirror em {
            color: ${theme.palette.text.secondary};
            font-style: italic;
          }

          .ProseMirror u {
            text-decoration: underline;
            text-decoration-color: ${theme.palette.primary.main};
            text-decoration-thickness: 2px;
            text-underline-offset: 2px;
          }

          .ProseMirror s {
            text-decoration: line-through;
            color: ${theme.palette.text.secondary};
          }

          /* Focus styles */
          .ProseMirror:focus {
            outline: none;
          }

          /* Selection styles */
          .ProseMirror ::selection {
            background: ${theme.palette.mode === "dark"
              ? "rgba(100, 108, 255, 0.3)"
              : "rgba(100, 108, 255, 0.2)"};
          }
        `}</style>
      </Paper>
    );
  }
);

MUITiptapEditor.displayName = "MUITiptapEditor";

// Main Form Component with Material-UI
const RichTextEditor = () => {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content:
        "<h1>Welcome to the Enhanced Material-UI Editor!</h1><p>This is a rich text editor built with <strong>@tiptap/react</strong> and styled with your custom <em>Material-UI theme</em>.</p><h2>Key Features:</h2><ul><li><strong>Custom theme integration</strong> - Matches your brand colors</li><li><em>Responsive design</em> - Works beautifully on all devices</li><li><u>Professional toolbar</u> - Full formatting options</li><li>Dark/Light mode support</li></ul><h3>Code Support</h3><p>Inline <code>code snippets</code> and code blocks:</p><pre><code>const theme = useTheme();\nconsole.log('Your theme is awesome!');</code></pre><blockquote>Great design is not just what it looks like and feels like. Design is how it works.</blockquote><p>Start editing to see the enhanced styling in action!</p>",
    },
  });

  const editorRef = React.useRef(null);
  const watchedContent = watch("content");

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(
      `Form submitted successfully!\n\nTitle: ${data.title}\nCategory: ${data.category}\nContent Length: ${data.content.length} characters`
    );
  };

  const handleClearEditor = () => {
    setValue("content", "");
    editorRef.current?.clear();
  };

  const handleInsertSample = () => {
    const sampleContent = `
    <h1>SmartFit™ Wireless Earbuds</h1>
    <p>Experience crystal-clear sound and all-day comfort with the new <strong>SmartFit™ Wireless Earbuds</strong>. 
    Designed for music lovers, professionals, and everyday users, these earbuds combine premium audio, 
    sleek design, and reliable connectivity in one compact package.</p>

    <h2>Key Features</h2>
    <ul>
      <li><strong>Hi-Fi Stereo Sound</strong> — Rich bass, crisp mids, and clear highs for an immersive experience.</li>
      <li><em>Active Noise Cancellation</em> — Block out background noise whether you’re on a call or on the go.</li>
      <li><u>24-Hour Battery Life</u> — Enjoy up to 6 hours per charge, plus 3 recharges from the case.</li>
      <li>IPX5 Water Resistance — Perfect for workouts, commutes, and outdoor use.</li>
      <li>Touch Controls — Skip tracks, adjust volume, and answer calls with a tap.</li>
    </ul>

    <h3>Technical Specifications</h3>
    <table border="1" cellpadding="6" cellspacing="0">
      <tr><th>Specification</th><th>Details</th></tr>
      <tr><td>Bluetooth Version</td><td>5.3</td></tr>
      <tr><td>Battery Life</td><td>Up to 24 hours with charging case</td></tr>
      <tr><td>Charging Time</td><td>1.5 hours</td></tr>
      <tr><td>Weight</td><td>4.5g per earbud</td></tr>
      <tr><td>Water Resistance</td><td>IPX5</td></tr>
    </table>

    <h3>Customer Reviews</h3>
    <blockquote>
      "These are hands down the best earbuds I’ve ever owned — the sound is incredible and they stay in place during workouts!" – Sarah L.
    </blockquote>

    <p>Order your <strong>SmartFit™ Wireless Earbuds</strong> today and enjoy free shipping, a 1-year warranty, and a 30-day money-back guarantee.</p>
  `;
    setValue("content", sampleContent);
  };

  const getWordCount = (html) => {
    const textContent = html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return textContent.length > 0 ? textContent.split(" ").length : 0;
  };

  const getCharCount = (html) => {
    return html.replace(/<[^>]*>/g, "").length;
  };

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        p: 3,
        minHeight: "100vh",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(135deg, #1b1b1f 0%, #1a1a1a 100%)"
            : "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
      }}
    >
      {/* Form */}
      <Card elevation={0}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="content"
                  control={control}
                  rules={{
                    required: "Content is required",
                    minLength: {
                      value: 50,
                      message: "Content must be at least 50 characters",
                    },
                  }}
                  render={({ field }) => (
                    <MUITiptapEditor
                      ref={editorRef}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Write your content here... Use the toolbar to format your text!"
                      height="500px"
                      error={!!errors.content}
                      helperText={errors.content?.message}
                    />
                  )}
                />

                {/* Content Stats */}
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mt: 2,
                    bgcolor: "background.nestedPaper",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Stack direction="row" spacing={3}>
                    <Typography variant="body2">
                      <strong>Characters:</strong>{" "}
                      {getCharCount(watchedContent)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Words:</strong> {getWordCount(watchedContent)}
                    </Typography>
                  </Stack>
                  <Chip
                    label={
                      getCharCount(watchedContent) >= 50
                        ? "Content requirement met"
                        : "Content too short"
                    }
                    color={
                      getCharCount(watchedContent) >= 50 ? "success" : "warning"
                    }
                    size="small"
                  />
                </Paper>
              </Grid>

              {/* Action Buttons */}
              <Grid size={{ xs: 12 }}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}
                  flexWrap="wrap"
                >
                  <Button
                    variant="outlined"
                    onClick={handleClearEditor}
                    color="warning"
                  >
                    Clear Editor
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={handleInsertSample}
                    color="success"
                  >
                    Insert Sample
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* <Accordion sx={{ mt: 3 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1">🔍 Debug Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Theme Mode:</strong> {theme.palette.mode}
                </Typography>
                <Typography variant="body2">
                  <strong>Form Valid:</strong>{" "}
                  {Object.keys(errors).length === 0 ? "✅ Yes" : "❌ No"}
                </Typography>
                <Typography variant="body2">
                  <strong>Content Length:</strong> {watchedContent.length}{" "}
                  characters
                </Typography>
                {Object.keys(errors).length > 0 && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    <Typography variant="body2">
                      <strong>Errors:</strong> {JSON.stringify(errors, null, 2)}
                    </Typography>
                  </Alert>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion> */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RichTextEditor;
