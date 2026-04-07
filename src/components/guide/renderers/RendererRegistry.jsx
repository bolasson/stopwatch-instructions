import { 
  TextRenderer, 
  CalloutRenderer, 
  CodeRenderer, 
  ImageRenderer, 
  ChecklistRenderer,
  TextBlockRenderer,
  InfoRenderer,
  resolveAssetPath
} from './GenericRenderers';

export const CONTENT_ITEM_RENDERERS = {
  text: (item, index) => <TextRenderer key={`text-${index}`} {...item} index={index} />,
  callout: (item, index) => <CalloutRenderer key={`callout-${index}`} {...item} index={index} />,
  code: (item, index) => <CodeRenderer key={`code-${index}`} {...item} index={index} />,
  image: (item, index) => <ImageRenderer key={`image-${index}`} {...item} index={index} />,
  info: (item, index) => <InfoRenderer key={`info-${index}`} {...item} index={index} />,
};

export const PART_RENDERERS = {
  checklist: (part) => <ChecklistRenderer items={part.items} />,
  callout: (part) => <CalloutRenderer items={part.items} />,
  composite: (part) => (
    <>
      {part.content.map((item, idx) => {
        const Renderer = CONTENT_ITEM_RENDERERS[item.type];
        return Renderer ? Renderer(item, idx) : null;
      })}
    </>
  ),
  code: (part) => (
    <CodeRenderer items={part.items} footer={part.footer} index="part-code" />
  ),
  text_block: (part) => <TextBlockRenderer content={part.content} />,
};

export { resolveAssetPath };
