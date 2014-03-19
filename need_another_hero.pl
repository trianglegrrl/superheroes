#!perl -w

use strict;
use warnings;

use JSON;
use Data::Dumper;

=head1 NAME

need_another_hero - generate random superheroes

=head1 SYNOPSIS

perl need_another_hero.pl start_id [quantity]

=head1 DESCRIPTION

Generates quantity random heroes starting with ID number start_id
and writes them to STDOUT in JSON.

=head1 AUTHOR

John Romkey<http://romkey.com/>

=head1 SEE ALSO

https://github.com/trianglegrrl/superheroes

=cut

# example superhero

#    id: 29,
#    fullName:"Krista Scott-Dixon",
#    email: "krista@precisionnutrition.com",

#    picUrl: "http://placepuppy.it/200/150",
#    discPicUrl: "/assets/SampleDISC.png",
#    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
#    whatIHate: "Nazis, snakes, and Nazis.",
#    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
#    majorDiscStyle: 'i',
#    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
#    priorities: "Eating, sleeping, making life difficult for The Man.",

#    assertiveness:31,
#    aggressiveness:2,
#    egoDrive:9,
#    empathy:68,
#    egoStrengthResilience:34,
#    riskTaking:95,
#    urgency:42,
#    cautiousness:62,
#    sociability:4,
#    gregariousness:27,
#    accommodation:28,
#    skepticism:85,
#    abstractReasoning:99,
#    ideaOrientation:99,
#    thoroughness:91,
#    flexibility:44,
#    selfStructure:47,
#    externalStructure:4

#warn $#ARGV;
#warn Dumper( $ARGV );

if( $#ARGV > 1 ) {
  die 'usage: perl need_another_hero.pl start_id [quantity]';
}

my $total = 20;
my $id = $ARGV[ 0 ];
my $used_names = {};

if ( $#ARGV == 1 ) {
  $total = $ARGV[ 1 ];
}

my @heroes = ();
for ( my $i = 0; $i < $total; $i++ ) {
  my $hero = mk_hero( $id + $i, $used_names );

  push @heroes, $hero;
}

my $json = JSON->new->utf8;
$json->pretty;
$json->canonical;

print $json->encode( \@heroes );


sub mk_hero {
  my ( $id, $used ) = @_;
  my @attributes = ( 'assertiveness', 'aggressiveness', 'egoDrive', 'empathy', 'egoStrengthResilience', 'riskTaking', 'urgency', 'cautiousness', 'sociability', 'gregariousness', 'accommodation', 'skepticism', 'abstractReasoning', 'ideaOrientation', 'thoroughness', 'flexibility', 'selfStructure', 'externalStructure' );
  my @first_names = ( 'Marge', 'Lisa', 'Homer', 'Patty', 'Selma', 'Maggie', 'Ling', 'Ned', 'Kent', 'Montgomery', 'Maude', 'Rod', 'Todd', 'Julius', 'Nelson', 'Diamond Joe', 'Abraham', 'Waylon', 'Seymour', 'Clancy', 'Sarah' );
  my @last_names = ( 'Simpson', 'Bouvier', 'Flanders', 'Brockman', 'Burns', 'Hibbert', 'Muntz', 'Quimby', 'Waylon', 'Skinner' );

  my $hero = {};

  my $first_name = $first_names[ int( rand( $#first_names ) ) ];
  my $last_name = $last_names[ int( rand( $#last_names ) ) ];

  while ( 1 ) {
    $first_name = $first_names[ int( rand( $#first_names ) ) ];
    $last_name = $last_names[ int( rand( $#last_names ) ) ];

    last unless ( $used->{ $first_name . $last_name } );
  }

  $used->{ $first_name . $last_name } = 1;
  
  $hero->{ id } = $id;
  $hero->{ fullName } =  "$first_name $last_name";
  $hero->{ email } = lc( $first_name ) . '.' . lc( $last_name ) . '@precisionnutrition.com';
  $hero->{ twitterUrl } = 'http://twitter.com/' . lc( $first_name ) . lc( $last_name );
  $hero->{ facebookUrl } = 'http://facebook.com/' . lc( $first_name ) . lc( $last_name );
  $hero->{ gplusUrl } = 'http://plus.google.com/+' . $first_name . $last_name;
  $hero->{ pnProfileUrl } = 'http://www.precisionnutrition.com/meet-the-team/' . lc( $first_name ) . '-' . lc( $last_name );

  $hero->{ picUrl } = "http://placepuppy.it/200/150";
  $hero->{ discPicUrl } = "/assets/SampleDISC.png";

  $hero->{ whatILove } = "Red wine, long walks on the beach, and classless subnetting.";
  $hero->{ whatIHate } = "Nazis, snakes, and Nazis.";
  $hero->{ whatINeed } = "Compassion, commitment, and \$100,000 in unmarked US currency.";
  $hero->{ majorDiscStyle } = 'i';
  $hero->{ superpowers } = "Pushups, counting to 10, drop-kicking ill-behaved children.";
  $hero->{ priorities } = "Eating, sleeping, making life difficult for The Man.";

  foreach my $attr ( @attributes ) {
    $hero->{ $attr } = int( rand( 100 ) ) + 1;;
  }

  return $hero;
}
