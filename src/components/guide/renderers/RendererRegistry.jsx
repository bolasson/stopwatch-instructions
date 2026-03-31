import { 
  TextRenderer, 
  CalloutRenderer, 
  CodeRenderer, 
  ImageRenderer, 
  ChecklistRenderer,
  TextBlockRenderer,
  resolveAssetPath
} from './GenericRenderers';

export const CONTENT_ITEM_RENDERERS = {
  text: (item, index) => <TextRenderer key={`text-${index}`} {...item} index={index} />,
  callout: (item, index) => <CalloutRenderer key={`callout-${index}`} {...item} index={index} />,
  code: (item, index) => <CodeRenderer key={`code-${index}`} {...item} index={index} />,
  image: (item, index) => <ImageRenderer key={`image-${index}`} {...item} index={index} />,
};

export const SECTION_RENDERERS = {
  checklist: (section) => <ChecklistRenderer items={section.items} />,
  callout: (section) => <CalloutRenderer items={section.items} />,
  composite: (section) => (
    <>
      {section.content.map((item, idx) => {
        const Renderer = CONTENT_ITEM_RENDERERS[item.type];
        return Renderer ? Renderer(item, idx) : null;
      })}
    </>
  ),
  code: (section) => (
    <CodeRenderer items={section.items} footer={section.footer} index="section-code" />
  ),
  text_block: (section) => <TextBlockRenderer content={section.content} />,
};

export { resolveAssetPath };
