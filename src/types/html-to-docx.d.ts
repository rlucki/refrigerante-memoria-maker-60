
declare module 'html-to-docx' {
  export default function htmlToDocx(
    html: string,
    options?: {
      table?: {
        row?: {
          cantSplit?: boolean;
        };
      };
      [key: string]: any;
    }
  ): Promise<Buffer>;
}
