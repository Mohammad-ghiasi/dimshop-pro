import MainBanners from "@/components/banners/MainBanners";
import FullMenuSSR from "@/components/header/FullMenuSSR";
import SimpleProduct from "@/components/homeProducts/SimpleProduct";
import BodyPrvider from "@/components/ui-providers/BodyProvider";
import UserServerTest from "@/components/UserServerTest";
import { cookies } from "next/headers";

export default function Home() {
    const theme = cookies().get("theme")?.value
  return (
    <>
      <FullMenuSSR />
      <BodyPrvider>
        <div className="my-10">
          <UserServerTest />
        </div>
        <p>{theme}</p>
        <MainBanners />
        <SimpleProduct />
        <p className="pt-4">
         mmmmmm Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem,
          perferendis, praesentium similique vero maxime aliquid adipisci,
          mollitia commodi nihil vitae officiis! Fugiat facilis similique,
          maiores voluptatem nesciunt ipsam! Corrupti, dolore. A iusto
          aspernatur minus hic sint magnam eligendi sequi fugit corrupti ullam
          itaque commodi facilis, pariatur inventore sunt, suscipit ex quia!
          Itaque, ullam! Quidem, recusandae tempore delectus suscipit sed
          adipisci? Amet consectetur ipsum, quis inventore deserunt deleniti,
          eligendi distinctio dignissimos officiis itaque neque animi! Ab
          commodi sed ea quia quisquam cum molestiae modi eum, in illo possimus
          nesciunt corrupti repellendus. Magni numquam dolore nobis porro iure

          commodi mollitia officia est explicabo, debitis aut eius quasi!
          Temporibus, ad. Optio autem nostrum quisquam placeat voluptatibus
          magni debitis repudiandae temporibus, odio impedit exercitationem
          commodi, a minus cum reprehenderit ducimus expedita vero eius facere
          dignissimos aut? Exercitationem voluptatem dolor fugiat placeat. Fuga,
          pariatur? Aperiam quas assumenda perferendis rem itaque voluptatum
          eveniet laudantium sit odio eaque fugiat cumque dolore iste
          praesentium nulla perspiciatis quaerat repudiandae possimus, ut
          dignissimos asperiores eum. Debitis, eum. Sapiente recusandae sunt,
          dolorem reiciendis quo nihil culpa quaerat ab soluta facere non nemo.
          Quod sapiente, ratione obcaecati a rerum veniam, vitae amet dolor
          cumque, provident nam velit fugiat dolore? Quibusdam iure libero id
          veritatis qui, obcaecati reprehenderit ex sit maiores voluptatem et
          laborum. Incidunt voluptate cum pariatur? Placeat earum perferendis at
          perspiciatis optio porro pariatur nisi, iusto libero neque. Magnam
          laudantium incidunt asperiores cupiditate eaque nisi, neque distinctio
          officia pariatur eveniet fugit vero expedita, perspiciatis voluptate.
          Architecto dignissimos suscipit est quisquam repellendus perspiciatis
          sapiente totam dolore cupiditate voluptate? Earum. Fugiat, neque
          labore. Dolorum doloribus excepturi repellat beatae, natus cum ab
          veritatis quibusdam ad ea vitae nulla, provident quam soluta
          recusandae nostrum sed dolore laudantium eligendi itaque laboriosam
          repellendus saepe! Minus aliquid veritatis similique ipsa blanditiis,
          nihil, deserunt quos animi amet reprehenderit dolorum modi ipsam
          soluta excepturi aut aliquam a provident odio unde sit vero cum totam?
          Consectetur, iure modi. Deserunt voluptate eum quam, ipsa velit
          pariatur odio nihil veniam? Fugiat accusantium eius, ratione culpa
          optio porro odio? Nulla ipsam beatae doloremque laborum modi sint
          eius. Consequuntur omnis assumenda a. Ex minus nam facilis nostrum
          saepe, excepturi autem adipisci quos beatae animi, quas libero, fugit
          cupiditate. Id laboriosam provident autem temporibus voluptate,
          laudantium similique ad placeat ratione fuga praesentium beatae.
          Minus, odio consequuntur. Non odit amet laudantium asperiores, magnam
          iusto animi iste sint. Obcaecati doloremque voluptatibus officia nemo
          quia fugiat id eligendi sit in, suscipit rem, tenetur nesciunt culpa
          similique! Placeat officia adipisci eius quas accusantium minus sequi.
          Et dicta unde consequatur quos amet qui quaerat assumenda consequuntur
          recusandae incidunt est laborum, molestias ullam eum aut ad quo
          voluptatibus voluptate. Veritatis repellat voluptatibus facere
          explicabo animi? Quo sapiente quaerat laboriosam, commodi rem ipsa,
          repellendus voluptates provident odio consequuntur recusandae
          temporibus nesciunt eos at unde quisquam beatae quas quis iusto
          veritatis? Excepturi quod explicabo mollitia tempore temporibus
          doloribus culpa blanditiis deserunt natus? Esse nulla necessitatibus,
          obcaecati eveniet repudiandae aliquam quae cupiditate veniam,
          molestiae porro, non architecto pariatur modi voluptatum blanditiis
          deleniti! Magni, et. Sunt assumenda dolorum nam, nesciunt eum quo?
          Voluptates sed, illum sint repellendus hic quo perspiciatis veritatis
          expedita doloribus, iste provident id accusamus aliquam tenetur
          architecto nisi, fugit enim. Officiis laboriosam aut ullam dolorem
          labore laudantium cupiditate in facilis magnam quam maxime pariatur,
          dolore molestias? Assumenda beatae sed distinctio debitis praesentium,
          aut ex! Aspernatur error delectus labore omnis nesciunt? Similique
          ipsam consequuntur nemo, nihil quae fuga distinctio necessitatibus
          unde, totam reiciendis accusamus, accusantium a blanditiis eum
          nesciunt. Ducimus quia voluptate autem quam itaque modi magni fuga
          nostrum consequatur ratione. Facilis pariatur odit eius doloremque
          error voluptatum accusamus consequuntur doloribus saepe corporis
          cupiditate cumque nesciunt a voluptatem voluptate alias officiis
          architecto, nam sint sequi provident. Dolore a tempora dolor. Aliquid!
          Voluptatibus eaque assumenda vero, libero natus molestiae non illum
          error necessitatibus. Minus earum laboriosam repellendus veniam
          repudiandae voluptatibus totam eligendi? In earum quo provident
          maiores aperiam tempore molestiae maxime? Obcaecati!
        </p>
      </BodyPrvider>
    </>
  );
}
