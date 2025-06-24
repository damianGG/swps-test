import Image from 'next/image';
import { getArticle } from '@/lib/api';
import DOMPurify from 'isomorphic-dompurify';

type Props = { params: { id: string } };

export default async function ArticlePage({ params }: Props) {
    const { data } = await getArticle(params.id);
    const { title, text, images, obrazy } = data.attributes;

    /* ---------- mini-helpery ---------- */

    // Joomla dokleja fragment po #joomlaImage; potrzebujemy czystego URL-a
    const stripHash = (url?: string) => url?.split('#')[0] ?? '';

    // Galeria „obrazy” jest stringiem JSON z kluczami rowX
    const extraImages: { src: string; alt: string; caption?: string }[] = [];
    if (obrazy) {
        try {
            const parsed = JSON.parse(obrazy);
            Object.values(parsed).forEach((row: any) => {
                const file = row.field4?.imagefile as string | undefined;
                if (file) {
                    extraImages.push({
                        src: `https://test-www0.swps.pl/${file.split('#')[0]}`,
                        alt: row.field4?.alt_text ?? '',
                        caption: row.field8 ?? '',
                    });
                }
            });
        } catch {
            /* nic – zła struktura JSON */
        }
    }

    /* ---------- render ---------- */

    return (
        <article className="prose lg:prose-lg mx-auto p-4">
            <h1>{title}</h1>

            {images?.image_intro && (
                <Image
                    src={stripHash(images.image_intro)}
                    alt={images?.image_intro_alt ?? ''}
                    width={1200}
                    height={400}
                    className="rounded-lg mb-6"
                    priority
                />
            )}

            {/* Joomla zwraca gotowe <p>, <ul> itd. -- oczyszczamy dla pewności */}
            <div
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(text, { ADD_ATTR: ['target'] }),
                }}
            />

            {extraImages.length > 0 && (
                <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    {extraImages.map((img, i) => (
                        <figure key={i} className="flex flex-col">
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={640}
                                height={320}
                                className="rounded shadow"
                            />
                            {img.caption && (
                                <figcaption className="mt-2 text-sm text-gray-500">
                                    {img.caption}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </section>
            )}
        </article>
    );
}
