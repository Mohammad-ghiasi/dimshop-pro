import FullMenuSSR from "@/components/header/FullMenuSSR";
import BodyPrvider from "@/components/ui-providers/BodyProvider";
import UserServerTest from "@/components/UserServerTest";
import { cookies } from "next/headers";

export default function Home() {
    const theme = cookies().get("theme")?.value
  return (
    <>
      {/* <FullMenu><BaseMenu /></FullMenu> */}
      <FullMenuSSR />
      <BodyPrvider>
        <div className="my-10">
          <UserServerTest />
        </div>
        <p>{theme}</p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem,
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
          mollitia placeat aperiam rerum, delectus natus provident
          exercitationem quo quaerat iusto maxime hic et! Iusto vitae esse sit
          voluptatibus architecto similique laboriosam odio ut. Corrupti nisi
          dignissimos soluta quae beatae, at deserunt! Culpa nemo tempora quasi
          quas quae unde optio vero cum sint eius in aspernatur iusto, quos quod
          totam sunt aliquam a alias! Doloremque magni voluptatum porro maxime
          sed, illo obcaecati maiores? Obcaecati ullam repellat hic, illum porro
          deleniti amet commodi ea ex deserunt quidem, quibusdam officia
          voluptatem voluptate quae, veniam ut possimus! Voluptas voluptatum
          voluptatibus tempore minima corrupti fugiat consequuntur officiis
          ipsam fugit molestias doloremque sit ipsa harum placeat animi mollitia
          aut autem sequi saepe atque praesentium quia sed, nisi nam. Doloribus.
          Fugiat a autem ut accusantium est, illum necessitatibus dolore
          nesciunt dolor libero, inventore ab, unde in aut. Tempore,
          perspiciatis nemo! Laborum commodi nisi cumque maiores voluptate
          libero, quod pariatur voluptatibus! Voluptas natus unde earum deserunt
          accusamus odit nobis voluptates similique? Consequuntur libero
          praesentium atque ipsum veniam. Libero dolores eaque nihil, sit velit
          eius consectetur fugiat accusamus minima. Illo, iure laboriosam!
          Recusandae ducimus aut dignissimos libero quos magni iusto in quidem
          id accusamus amet fugiat minima modi, praesentium doloribus. Mollitia
          soluta temporibus optio eaque! Ipsam earum in atque harum unde
          distinctio. Laboriosam, placeat minus. Ad illum quibusdam, cum
          voluptatem temporibus aliquam quidem libero at suscipit harum quas,
          molestias iste sapiente saepe, laborum iusto sint minus voluptas
          voluptate nobis? Quia, enim quaerat. Sequi inventore ullam ab tempore
          amet debitis fugiat soluta, dolorum laudantium, molestias aspernatur
          modi totam sint nobis, facere a ipsam delectus reprehenderit dolores
          laborum iure hic culpa velit. Cum, rerum. Amet molestias illum eveniet
          eum mollitia! Porro magni in minus. Sequi placeat adipisci quos
          dolores eius cupiditate itaque nobis quibusdam non! Repellendus
          molestiae deserunt facilis iste tenetur at cupiditate voluptate? Eum
          cupiditate magni, dolor ex rerum eaque accusantium dolores distinctio
          quo in exercitationem velit dolorem placeat. Deserunt aliquam unde,
          minus vel quas distinctio totam odit. Labore aspernatur omnis
          excepturi ullam. Itaque, sequi nihil consequatur non recusandae
          voluptatibus! Repudiandae eos voluptatem et saepe reprehenderit,
          debitis modi nam placeat assumenda nisi aliquam. Minima, deserunt
          tempora. Consequatur perspiciatis pariatur iusto reprehenderit
          molestiae possimus! Iste nesciunt repudiandae ex quo, libero quos
          perferendis similique optio, voluptate quae rem deleniti, a
          voluptates. Perferendis amet consequuntur laborum. Soluta aspernatur
          vel culpa dolor cupiditate incidunt quod voluptate assumenda! Ipsum
          fugiat esse voluptas exercitationem, sequi natus in et, perferendis
          quia eius nobis minima consequatur distinctio ea deleniti cupiditate,
          nesciunt dignissimos cum fugit. Earum corrupti tempora sit minima!
          Pariatur, officiis. Tempore rerum, nesciunt accusantium repellat
          libero impedit amet pariatur, cumque odio porro quibusdam laudantium
          aliquid ipsa et iure quo. Quia asperiores odio facere ullam animi
          reprehenderit omnis in beatae provident! Pariatur aut, unde dolor
          deleniti laudantium nihil praesentium nemo dignissimos rem molestias
          ratione ipsa amet quaerat iusto ipsum asperiores odio reprehenderit
          beatae consequuntur vitae nostrum voluptatum. Fugit, esse aspernatur.
          Sint! Vero in magni dolor perspiciatis architecto obcaecati corporis
          quidem tenetur optio quas reiciendis ipsam laborum temporibus, vitae
          nam culpa fuga delectus incidunt. Doloremque, in? Adipisci id minima
          aut molestias voluptatibus? Delectus omnis possimus assumenda enim
          doloremque modi at architecto iusto provident ipsam mollitia optio
          vitae quod corporis accusantium tenetur nam, similique ipsa itaque
          qui. Consequatur a enim beatae cum nihil. Ipsa est impedit voluptates
          quidem sed natus provident doloremque? Excepturi hic error dolore
          laborum ea accusamus optio, amet fugit ipsum laudantium! Repudiandae
          beatae aliquid nostrum alias voluptates quisquam eaque aliquam.
          Repellat, dicta quaerat accusantium, architecto necessitatibus quos
          voluptatibus exercitationem soluta, nam esse tempora. Laudantium quo
          voluptate ducimus nemo rem, minima vel quos nesciunt perferendis
          facere quibusdam suscipit ipsum et maxime? Architecto possimus nemo
          provident placeat, maiores vero vel quibusdam distinctio, omnis iste
          debitis! Est, et! Molestias eos ducimus atque. Quasi illo nostrum in
          sint obcaecati laboriosam vitae soluta culpa omnis! Sapiente sed,
          repellendus ea facere illum tempora fugit alias aut, fuga consectetur
          asperiores facilis, officia quos maxime consequatur ex? Tempore,
          adipisci labore corrupti qui repellendus rerum autem commodi
          laboriosam ducimus! Earum, placeat? Iusto, quasi, ab cum ut
          accusantium maxime provident, doloribus totam at est ullam inventore
          exercitationem harum. Quibusdam, optio est facere ad quod consequatur
          fugiat magnam dolorem similique quia? Odio nesciunt, mollitia deserunt
          placeat ipsam pariatur accusamus inventore id! Labore beatae, delectus
          veniam accusamus magni voluptate totam. Praesentium modi nam porro id
          asperiores, rerum fugiat animi possimus doloremque vel? Culpa eum
          corrupti quisquam enim. Quaerat, eum cupiditate quidem rem a accusamus
          dignissimos expedita praesentium ut provident laboriosam! Assumenda
          voluptate culpa porro nam, adipisci possimus voluptates facere totam
          eligendi saepe. A, mollitia nemo obcaecati ducimus reiciendis aliquam.
          Sapiente iusto cumque vel eveniet maiores voluptatum et quaerat
          aliquid consequuntur porro possimus fuga, tempore ullam quod velit
          necessitatibus ab atque. Corrupti, tempora? Reiciendis ad quisquam
          dolorum id, numquam magnam delectus, iste sed ipsa, eligendi at
          distinctio culpa ex. Quo, officiis. Illo, et. Sequi saepe laborum unde
          cupiditate labore quam doloribus quos quo? Est laborum beatae aperiam
          ratione odio magnam perspiciatis mollitia nihil modi aspernatur quae
          officia voluptatibus, minima animi saepe alias assumenda deleniti
          quas, id rem minus. Error veniam praesentium sed possimus. Excepturi
          commodi exercitationem modi distinctio expedita voluptatem fuga,
          inventore nihil facilis voluptatum totam repellat officia pariatur
          dolorem et quo veniam? Placeat vitae omnis, rerum rem maiores
          doloremque voluptatem perspiciatis corrupti! Iste, maiores. Eaque
          dolore nobis deserunt sunt eius. Natus sunt dolores veritatis animi!
          Ipsa nulla delectus reiciendis quos. Amet labore eveniet iste et sit
          molestiae porro excepturi officia, consequuntur illum! Reprehenderit
          iusto quo nam quis hic alias, quos, odio magni enim natus quidem omnis
          totam exercitationem voluptate, minima odit rerum iure dolor ducimus
          ipsa blanditiis eius pariatur tempore harum! Nihil. Atque maxime
          tenetur veritatis tempora, illum aliquam quis? Suscipit debitis
          incidunt magni earum ad consectetur ea quam commodi. Laudantium eum
          illum consectetur quam. Eos, atque laboriosam similique nesciunt nemo
          amet. Voluptatum nisi inventore eaque harum animi perspiciatis
          distinctio officiis exercitationem. Quidem, veritatis. Quidem, ullam
          laboriosam debitis, inventore commodi obcaecati odio odit facilis,
          sint natus consequuntur nam molestias! Culpa, vel accusantium. Ad
          placeat deleniti quia nihil voluptatibus? Dicta quas numquam tempora
          reprehenderit ut maiores maxime. Sapiente distinctio sit, quis quasi
          suscipit ad libero maxime ratione excepturi soluta, obcaecati
          laboriosam iste ullam! Enim dolorum deserunt nostrum est tempore neque
          esse perferendis praesentium minima illo quam officiis labore sed sunt
          iusto repellendus aspernatur quis minus, qui in dicta hic accusamus?
          Laborum, laboriosam sunt. Ex doloribus error dicta? Harum quo aperiam
          ad esse provident nisi quasi, labore neque dolores maiores est fugit
          dolor iusto et doloribus quam fuga porro amet ipsam quia assumenda
          aspernatur? Id expedita fugiat similique repudiandae harum. Ducimus
          deleniti impedit mollitia cumque. Autem perferendis culpa amet? Quo
          tempora rerum sunt aut officiis, unde, est sint odio deserunt enim
          expedita harum fugit? Nobis aut, quo molestiae ut iure veritatis nihil
          quaerat suscipit, eum maiores, voluptatum harum debitis? Dignissimos
          amet vero, vel voluptas libero quis incidunt corrupti dicta, rem
          tempore maiores aperiam culpa! Veniam distinctio inventore totam non
          atque reiciendis odio enim provident praesentium quod incidunt, modi,
          molestias repudiandae cumque rerum obcaecati fuga? Adipisci maxime,
          aspernatur tempora rem molestias porro tempore veniam? Incidunt. Quia
          sequi excepturi, repudiandae illo possimus ipsam culpa laudantium
          aperiam corrupti aut maxime vero quaerat quibusdam laborum ratione
          voluptas neque illum mollitia ab! Et laborum, optio debitis modi
          veritatis magnam? Sint itaque excepturi harum tempora mollitia?
          Aperiam veniam quibusdam amet dolor quos iure cumque. Perferendis
          nihil quisquam eos officiis hic, accusamus a tenetur animi, mollitia
          inventore illum assumenda vel omnis? Sit, tempora, voluptate iure
          asperiores autem fugit excepturi itaque et exercitationem ab id
          similique saepe delectus! Facere rem quis ratione molestias fugiat
          obcaecati, praesentium error tenetur aut voluptates enim cupiditate.
          Rem quo vel ipsum soluta necessitatibus laboriosam expedita
          repudiandae rerum. Et error, quae molestiae ipsam mollitia voluptas
          eveniet adipisci excepturi porro quas sapiente provident, hic
          consectetur libero in voluptatibus perspiciatis. Inventore accusamus
          quisquam ullam adipisci pariatur reiciendis optio rem ipsam deleniti
          alias praesentium ad, iste error natus! Non voluptatem vel eaque
          explicabo quis. Nobis repellat quibusdam, inventore atque quis
          ratione. Enim eveniet a ut necessitatibus totam sapiente amet
          molestias beatae incidunt sunt, impedit mollitia ipsam quae error
          architecto laudantium aliquam in dolores. Harum nulla saepe modi. Aut
          cumque consequuntur perferendis? Minus quasi nemo esse dolore beatae
          tempore a tempora asperiores error natus, sint molestiae labore eaque
          ducimus assumenda, praesentium, autem ratione modi laborum. Amet enim
          provident dolorem modi porro. Eius? Praesentium odio quam velit
          maiores in doloremque consequuntur pariatur odit illo harum totam
          assumenda saepe iusto sint amet, non beatae voluptatibus rem nam
          repellendus impedit. Distinctio totam ullam enim fugit! Atque rem
          voluptatibus natus, nihil hic ullam iste ab corporis incidunt aliquam
          fuga numquam laudantium officiis aliquid debitis recusandae nobis quod
          culpa, earum soluta tempora quia molestias! Repellat, amet sapiente!
          Pariatur et illum dolorem provident unde rem vel ipsa neque cum
          tempora, temporibus incidunt inventore amet totam similique minima
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
